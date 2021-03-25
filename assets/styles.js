import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
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
 
  text: {
    color: 'black'
  },
  card: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornsilk'
  },

  // card set
  cardUnit: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 40,
    height: 100,
    shadowRadius: 30,
    shadowColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPage: {
    alignItems: 'center',
    padding: 20,
  },

  // cards pages
  cardsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  touchContainer: {
    display: 'flex',
    flexDirection: 'row', 
  },
  touchLeft: {
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  touchRight: {
    width: 100,
    height: 100,
    backgroundColor: 'coral'
  },

  // Home Page
  homePage: {
    alignItems: 'center',
    padding: 30,
    flex: 1,
  },
  homeCard: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 40,
    height: 300,
    shadowRadius: 30,
    shadowColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
})