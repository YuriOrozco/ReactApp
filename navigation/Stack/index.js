import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/AntDesign'


import Routes from './stackRoutes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = ({ navigate }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Restaurantes"
                component={Routes.Restaurantes}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="find" color={color} size={size} />
                        )
                    }
                }
            />
            
            <Tab.Screen
                name="Editar"
                component={Routes.Favoritos}
                options={{
                    tabBarIcon: ({ color, size }) => (<Icon name="edit" color={color} size={size} />)
                }
                }
            />
               <Tab.Screen
                name="Anadir"
                component={Routes.Anadir}
                options={{
                    tabBarIcon: ({ color, size }) => (<Icon name="plus" color={color} size={size} />)
                }
                }
            />
            <Tab.Screen
                name="Perfil"
                component={Routes.Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (<MaterialIcons name="inventory" color={color} size={size}></MaterialIcons>)
                }


                }
            />
           
          

        </Tab.Navigator>
    )
}
export default function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Routes.Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Logged"
                    component={TabNavigator}
                />
                <Stack.Screen
                    name="Register"
                    component={Routes.Register}
                />
                  <Stack.Screen
                    name="RestauranteDet"
                    component={Routes.RestauranteDet}
                /> 
            
                  
            </Stack.Navigator>
        </NavigationContainer>
    )
}