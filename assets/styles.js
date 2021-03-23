import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  search: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
    paddingHorizontal: 130,
    paddingVertical: 5,
    zIndex: 2,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 400,
    marginBottom: 10,
  },
  home: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    color: 'black'
  },
  card: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornsilk'
  }
})