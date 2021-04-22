import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import { Home, Details, Fragman, TrendPage, SearchScreen, FavoryListPage,TV} from './pages'
import {reducer} from './context'

const store = createStore(reducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackHomeComponent=()=> {
  return(
  <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: "FAVORITE FILM" }}/>
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Fragman" component={Fragman} options={{title: "FRAGMAN" }}/>
        <Stack.Screen name="TrendPage" component={TrendPage} options={{title: "TREND PAGE" }}/>
      </Stack.Navigator>
  )}
  const StackSearchSecreen=()=> {
    return(
    <Stack.Navigator>
          <Stack.Screen name="SearchSecreen" component={SearchScreen} options={{title: "SEARCH PAGE" }}/>
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Fragman" component={Fragman} options={{title: "FRAGMAN" }}/>
          <Stack.Screen name="TrendPage" component={TrendPage} options={{title: "TREND PAGE" }}/>
        </Stack.Navigator>
    )}
    const FavoritesSecreen=()=> {
      return(
      <Stack.Navigator>
            <Stack.Screen name="Favorites" component={FavoryListPage} options={{title: "FAVORITES" }}/>
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Fragman" component={Fragman} options={{title: "FRAGMAN" }}/>
            <Stack.Screen name="TrendPage" component={TrendPage} options={{title: "TREND PAGE" }}/>
          </Stack.Navigator>
      )}
      const TvPages=()=> {
        return(
        <Stack.Navigator>
              <Stack.Screen name="TV" component={TV} options={{title: "TV" }}/>
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="Fragman" component={Fragman} options={{title: "FRAGMAN" }}/>
              <Stack.Screen name="TrendPage" component={TrendPage} options={{title: "TREND PAGE" }}/>
            </Stack.Navigator>
        )}
  


function Router() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        
        screenOptions={({ route }) => ({
          tabBarLabel:() => {return null},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'movie-search' : 'movie-search-outline';
            }
            else if (route.name === 'Favorites') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }
            else if (route.name === 'TV') {
              iconName = focused ? 'television-box' : 'television-box';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3399FF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={StackHomeComponent} />
        <Tab.Screen name="Search" component={StackSearchSecreen} />
        <Tab.Screen name="Favorites" component={FavoritesSecreen} />
        <Tab.Screen name="TV" component={TvPages} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default Router;