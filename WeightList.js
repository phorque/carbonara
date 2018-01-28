import React from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Fab, Radio, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import 'react-native-svg';
import { LineChart, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import moment from 'moment';

import { updateRoute } from './actions/route';
import { removeWeight, setSelectedWeight } from './actions/weights';

const sortWeights = (weights) => (
  weights.sort((weight1, weight2) => (
    new Date(weight1.date).getTime() - new Date(weight2.date).getTime()
  ))
)

// const fakeWeights = [ 85.6, 85.1, 84.1, 85.3, 84.5, 83.9, 83, 82.4 ].map((weight, index) => (
//   {
//     weight,
//     date: new Date(2018, 1, 10 + index),
//     uuid: weight.toString()
//   }
// ))


const WeightList = (props) => {
  const sortedWeights = sortWeights(props.weights);
  const contentInset = { top: 20, bottom: 20, left: 10, right: 10 };
  const dataPoints = sortedWeights.map((weight) => Number(weight.weight));

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Header>
          <Body>
            <Title>CARBONARA</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ height: 256, flexDirection: 'row' }}>
          <YAxis
              dataPoints={dataPoints}
              contentInset={contentInset}
              labelStyle={{ color: 'grey' }}
              formatLabel={value => `${value}kg`}
          />
          <LineChart
              style={{ flex: 1, paddingVertical: 0 }}
              dataPoints={dataPoints}
              contentInset={contentInset}
              svg={{
                stroke: '#4A148C',
              }}
              curve={shape.curveNatural}
              showGrid={true}
          />
        </View>

        <Content>
          <View
          style={{
            paddingBottom: 64
          }}
          >
          {
            sortedWeights.reverse().map((weight) => (
              <ListItem
                style={{
                  flex: 1
                }}
                key={weight.uuid}
                onPress={() => props.selectedWeight === weight.uuid ? props.setSelectedWeight(null) : props.setSelectedWeight(weight.uuid)}
              >
                <Left>
                  <Text>{`${weight.weight}kg`}</Text>
                </Left>
                <Right>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    {moment(weight.date).format("L")}
                  </Text>
                </Right>
                <Right>
                  <Radio selected={props.selectedWeight === weight.uuid} />
                </Right>
              </ListItem>
            ))
          }
        </View>
        </Content>
        {
          props.selectedWeight ?
            <Fab
              style={{
                backgroundColor: "#d9534f"
              }}
              onPress={() => props.removeWeight(props.selectedWeight)}
            >
              <Icon name="md-trash" />
            </Fab>
          :
            <Fab
              style={{
                backgroundColor: "#4A148C"
              }}
              onPress={() => props.updateRoute("/new")}
            >
              <Icon name="md-add" />
            </Fab>
        }

      </View>
    </Container>
  );
}

const mapStateToProps = (state) => (
  {
    weights: state.weights,
    // weights: fakeWeights,
    selectedWeight: state.selectedWeight
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    updateRoute: (route) => (dispatch(updateRoute(route))),
    removeWeight: (uuid) => (dispatch(removeWeight(uuid))),
    setSelectedWeight: (uuid) => (dispatch(setSelectedWeight(uuid)))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(WeightList);
