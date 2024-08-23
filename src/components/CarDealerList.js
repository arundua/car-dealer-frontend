import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CarDealerCard from './CarDealerCard';

const CarDealerList = () => {
  const [dealers, setDealers] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0); //  total count
  const [currentCount, setCurrentCount] = useState(0); // current items count

  const effectRan = useRef(false);

  // Load default data
  const fetchInitialData = async () => {
    console.log("fetchInitialData called");
    setLoading(true);
    try {
      await fetchCities();  // Fetch cities first
      await fetchDealers('http://127.0.0.1:8000/api/car-dealers/');  
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!effectRan.current) {
      fetchInitialData();
      effectRan.current = true;
    }
  }, []);

  // Fetch dealers
  const fetchDealers = async (url, searchItem = '', selectedCity = '', reset = false) => {
    
    setLoading(true);
    
    const params = {};
    if (searchItem) params.search = searchItem;
    if (selectedCity) params.city = selectedCity;

    try {
      const response = await axios.get(url, { params });
      
      if (reset) {
        setDealers(response.data.results);
        setCurrentCount(response.data.results.length);
      } else {
        setDealers((prevDealers) => [...prevDealers, ...response.data.results]);
        setCurrentCount((prevCount) => prevCount + response.data.results.length);
      }
      setNextUrl(response.data.next);
      setTotalCount(response.data.count); // Update total count from response
    } catch (error) {
      console.error('Error fetching dealers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unique cities
  const fetchCities = async () => {
    console.log("fetchCities called");
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/car-dealers/cities/');
      console.log('Cities response:', response.data);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

    // detect scroll and load 
  const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      if (nextUrl && !loading) {
        fetchDealers(nextUrl, search, city);
      }
    }
  };

  // set up infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextUrl, loading]);

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log("handleSearch called with:", searchValue);
    setSearch(searchValue);
    setCurrentCount(0); // Reset current count on new search
    fetchDealers('http://127.0.0.1:8000/api/car-dealers/', searchValue, city, true);
  };

  // Detect city change
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    console.log("handleCityChange called with:", selectedCity);
    setCity(selectedCity);
    setCurrentCount(0); // Reset current count on city change
    fetchDealers('http://127.0.0.1:8000/api/car-dealers/', search, selectedCity, true);
  };

  return (
    <Container>
      <AppBar position="sticky">
        <Toolbar>
          <img
            alt="Logo"
            src="/gd-logo.png"
            style={{ width: "auto", height: 30 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Dealers App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search by name..."
            value={search}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            value={city}
            onChange={handleCityChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Display total count and current shown items count */}
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            Showing {currentCount} of {totalCount} results found
          </Typography>
        </Grid>

        {dealers.map((dealer) => (
          <CarDealerCard key={dealer.id} dealer={dealer} />
        ))}
        {loading && (
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CarDealerList;
