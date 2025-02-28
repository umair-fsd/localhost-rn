import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Settings from "./Settings"
import EditProfileStackNavigator from "./EditProfile/EditProfileStackNavigator"
import VisibilityPreferencesStackNavigator from "./VisibilityPreferences/VisibilityPreferencesStackNavigator"
import AccountStackNavigator from "./Account/AccountStackNavigator";

const SettingsStack = createStackNavigator();
function SettingsStackNavigator({ dispatch }) {
    return (
        <SettingsStack.Navigator
            screenOptions={{ animationEnabled: false }}
            mode="modal"
        >
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{ title: "Settings" }}
                initialParams={{ dispatch }}
            />
            <SettingsStack.Screen
                name="EditProfile"
                component={EditProfileStackNavigator}
                options={{ animationEnabled: true, headerShown: false }}
            />
            <SettingsStack.Screen
                name="VisibilityPreferences"
                component={VisibilityPreferencesStackNavigator}
                options={{ animationEnabled: true, headerShown: false }}
            />
            <SettingsStack.Screen
                name="Account"
                component={AccountStackNavigator}
                options={{ animationEnabled: true, headerShown: false }}
            />
        </SettingsStack.Navigator>
    )
}

export default SettingsStackNavigator