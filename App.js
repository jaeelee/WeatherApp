import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native'; // 화면 크기 알려주는 api 
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const API_KEY = process.env.REACT_APP_WEATHER_API;
const API_KEY = '99c43f280dc7340ba24fbd7231787ae1';
// console.log(API_KEY);

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atomsphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightnings",

}

export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("");
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 앱 사용중에만 위치를 사용
    if (!granted) {
      setOk(false);
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 1 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`);
    const json = await response.json();
    setDays(json.daily);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {
        days.length === 0 ? (
          <View style={{
            ...styles.container,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <ActivityIndicator
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.city}>
              <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
              horizontal // 가로로 스크롤
              pagingEnabled // page 형식으로 스크롤
              showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
              // indicatorStyle="black" // 스크롤바 스타일 (IOS에서만 작동)
              contentContainerStyle={styles.weather} // scrollView에 스타일 적용
            >
              {
                days.map((day, index) =>
                  <View key={index} style={styles.day}>
                    <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(0)}º</Text>
                    <View style={{ flexdirection: "row", alignItems: "center" }}>

                      <Fontisto name={icons[day.weather[0].main]} size={58} color="black" />
                      <Text style={styles.description}>{day.weather[0].main}</Text>
                    </View>
                  </View>
                )
              }
            </ScrollView >
          </View >
        )
      }
      <StatusBar style="auto"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Jeju Gothic",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    // flex: 3, -> scrollView에서는 scroll하기 위해서 내용이 스크린보다 커야하기 때문에 flex를 사용하지 않음
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 108,
    fontWeight: "600",
  },
  description: {
    fontSize: 38,
  },
});
