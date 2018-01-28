import React from 'react';
import { View } from 'react-native';
import { StyleProvider } from 'native-base';
import { Provider, connect } from 'react-redux';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import { PersistGate } from 'redux-persist/lib/integration/react'

import configureStore from './configureStore';
let { store, persistor } = configureStore();

import WeightList from './WeightList';
import WeightForm from './WeightForm';

const mapStateToProps = state => {
  return {
    route: state.route,
    weights: state.weights
  }
}

const Main = connect(mapStateToProps)((props) => {
  if (props.weights.length === 0) {
    return (<WeightForm />);
  }

  return (
    {
      "/": <WeightList />,
      "/new": <WeightForm />
    }[props.route]
  );
});

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    onWeightForm: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyleProvider style={getTheme(material)}>
            {this.state.fontLoaded ? <Main /> : <View />}
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}
