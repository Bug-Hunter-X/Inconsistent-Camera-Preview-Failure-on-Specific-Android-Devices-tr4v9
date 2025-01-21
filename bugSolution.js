/* bugSolution.js */
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
      //Additional Check
      const availableCameras = await Camera.getAvailableCamerasAsync();
      if (!availableCameras.length) {
        console.error('No cameras available');
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
      </Camera>
    </View>
  );
};

export default App;