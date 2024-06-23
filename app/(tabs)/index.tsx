import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../src/components/constants';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WeatherSearch from '../../src/components/weatherSearch';
import WeatherInfo from '../../src/components/weatherInfo';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const searchWeather = (location: any) => {
    setStatus('loading'); // Mengatur status ke "loading"
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // Konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus('success'); // Mengatur status ke "success"
      })
      .catch((error) => {
        console.log(error);
        setError('Something went wrong. Please try again with a correct city name.');
        setStatus('error'); // Mengatur status ke "error"
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.marginTop20}>
        {/* Menampilkan komponen berdasarkan status */}
        {status === 'loading' && <ActivityIndicator size="large" />}
        {status === 'success' && <WeatherInfo weatherData={weatherData} />}
        {status === 'error' && <Text>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
});

export default App;
