/**
 * @providesModule login
 */

import { StyleSheet, Dimensions } from 'react-native'

export const theme = {
  border: 20,
  width: Dimensions.get('window').width - 50,
  authWidth: Dimensions.get('window').width - 90,
  height: Dimensions.get('window').height - 400,
  padding: 30,
  marginTop: 50,
  
} 

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
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
    width: theme.width,
    height: 200,
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
    padding: theme.padding,
    flex: 1,
    backgroundColor: 'white',
  },
  homeCard: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: theme.width,
    height: 300,
    shadowRadius: 30,
    shadowColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
})
