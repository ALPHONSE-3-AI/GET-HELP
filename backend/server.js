const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;


const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for frontend requests

// Supabase client setup using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// API Route: GET /services
// Fetches all services from the services table for dropdown list
app.get('/services', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('service_name');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API Route: GET /localities
// Fetches all localities from the localities table for dropdown list
app.get('/localities', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('localities')
      .select('locality_name');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch localities' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API Route: POST /search-workers
// Searches workers based on service, locality, and availability filter
app.post('/search-workers', async (req, res) => {
  const { service, locality, availableOnly } = req.body;

  // Validate input
  if (!service || !locality) {
    return res.status(400).json({ error: 'Service and locality are required' });
  }

  try {
    let query = supabase
      .from('register_worker')
      .select('name, phone, profession, locality, is_available')
      .ilike('profession', `%${service}%`) // Case-insensitive match for profession
      .ilike('locality', `%${locality}%`); // Case-insensitive match for locality

    // If availableOnly is true, filter for available workers only
    if (availableOnly === true) {
      query = query.eq('is_available', true);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to search workers' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// API Route: POST /login-user
// Authenticates a user based on email and password
app.post('/login-user', async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATION
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // DATABASE FETCH
    const { data, error } = await supabase
      .from('register_user')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.json({ success: false, message: 'User not found' });
    }

    // PASSWORD CHECK
    if (password !== data.password) {
      return res.json({ success: false, message: 'Wrong password' });
    }

    // SUCCESS
    res.json({
      success: true,
      message: 'Login successful',
      userId: data.id
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// API Route: POST /login-worker
// Authenticates a worker based on email and password
app.post('/login-worker', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const { data, error } = await supabase
      .from('register_worker')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.json({ success: false, message: 'Worker not found' });
    }

    if (password !== data.password) {
      return res.json({ success: false, message: 'Wrong password' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      workerId: data.id
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// API Route: POST /signup-user
// Registers a new user with validation and inserts into the register_user table
app.post('/signup-user', async (req, res) => {
  try {
    const { name, email, password, address, phone, locality } = req.body;

    // VALIDATION
    if (!emailRegex.test(email))
      return res.json({ success: false, message: 'Invalid email' });

    if (!passwordRegex.test(password))
      return res.json({ success: false, message: 'Weak password' });

    // INSERT INTO DB
    const { error } = await supabase
      .from('register_user')
      .insert([
        { name, email, password, address, phone, locality }
      ]);

    if (error)
      return res.json({ success: false, message: 'Signup failed' });

    res.json({ success: true, message: 'User registered' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// API Route: POST /signup-worker
// Registers a new worker with validation and inserts into the register_worker table
app.post('/signup-worker', async (req, res) => {
  try {
    const { name, email, password, address, phone, profession, locality } = req.body;

    if (!emailRegex.test(email))
      return res.json({ success: false, message: 'Invalid email' });

    if (!passwordRegex.test(password))
      return res.json({ success: false, message: 'Weak password' });

    const { error } = await supabase
      .from('register_worker')
      .insert([
        { name, email, password, address, phone, profession, locality }
      ]);

    if (error)
      return res.json({ success: false, message: 'Signup failed' });

    res.json({ success: true, message: 'Worker registered' });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// API Route: POST /worker/toggle-availability
// Toggles a worker's availability status in the database
app.post('/worker/toggle-availability', async (req, res) => {
  try {
    const { workerId, isAvailable } = req.body;

    if (!workerId) {
      return res.json({ success: false, message: 'Worker ID missing' });
    }

    // UPDATE DATABASE
    const { error } = await supabase
      .from('register_worker')
      .update({ is_available: isAvailable })
      .eq('id', workerId);

    if (error) {
      return res.json({ success: false, message: 'Update failed' });
    }

    res.json({
      success: true,
      message: 'Availability updated',
      isAvailable
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// GET ALL WORKERS (for homepage green dot list)
app.get('/workers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('register_worker')
      .select('id, name, profession, locality, is_available');

    if (error) {
      return res.json({ success: false, message: 'Fetch failed' });
    }

    res.json({ success: true, workers: data });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





// API Route: GET /test-connection
// Tests the Supabase connection by querying the register_worker table
app.get('/test-connection', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('register_worker')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return res.status(500).json({ 
        connected: false, 
        error: 'Database connection failed: ' + error.message 
      });
    }

    res.json({ 
      connected: true, 
      message: 'Successfully connected to Supabase',
      workerCount: data 
    });
  } catch (err) {
    res.status(500).json({ 
      connected: false, 
      error: 'Connection error: ' + err.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});