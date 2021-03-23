import * as React from 'react';
import { View, Text, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../assets/styles';


export default function Map() {
  let regionInit = {
    latitude: 40.0055728,
    longitude: 116.347646,
    latitudeDelta: 0.0059107,
    longitudeDelta: 0.0062788, 
  }
  let markerInit = {
    latitude: 40.0059372,
    longitude: 116.3474919,
  }
  const [region, setRegion] = React.useState(regionInit)
  const [x, setX] = React.useState(markerInit)

  return (
    <View style={styles.container}>
      <View>
      <MapView style={styles.map}
        initialRegion={region}
        
        onRegionChange={setRegion}
        region={region}
      >
         <Marker draggable
          coordinate={x}
          onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
          title='在这里！'
          description={'经度'.concat((Math.round(x.latitude * 100)/100).toString()).concat(', 纬度'.concat((Math.round(x.longitude*100)/100).toString()))}
         />
      </MapView>
      <Button title='重置' onPress={() => (setRegion(regionInit), setX(markerInit))}></Button>
      </View>
      
      <Text>x {x.latitude} , {x.longitude}</Text>
      <Text>{region.latitudeDelta} , {region.longitudeDelta}</Text>

      
    </View>
    
  );
}

