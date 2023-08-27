import React from "react";
import navigationStrings from "./navigationStrings";
import * as Screens from '../Screens';
import TabRoutes from './TabRoutes';

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name={navigationStrings.TAB_ROUTES}
                component={TabRoutes}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name={navigationStrings.PORFILE_EDIT}
                component={Screens.ProfileEdit}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name={navigationStrings.LINKS}
                component={Screens.Links}
                options={{ headerShown: false }}

            />
              <Stack.Screen
                name={navigationStrings.ADD_POST}
                component={Screens.AddPost}
                options={{ headerShown: false }}

            />

        </>
    );
}