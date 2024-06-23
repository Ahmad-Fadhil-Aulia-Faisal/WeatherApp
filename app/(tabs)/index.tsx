import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../src/components/constants'; // Pastikan Anda menyimpan konstanta dalam file constants.js
import { View, StyleSheet } from 'react-native';
import WeatherSearch from '../../src/components/weatherSearch';
import WeatherInfo from '../../src/components/weatherInfo';

const App = () => {
  const [weatherData, setWeatherData] = useState(null); // State untuk menyimpan data cuaca

  const searchWeather = (location: any) => {
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`) // tambahkan units=metric untuk satuan Celcius
      .then((response) => {
        const data = response.data;
        setWeatherData(data); // Simpan data cuaca ke dalam state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <WeatherInfo weatherData={weatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;
