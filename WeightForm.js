import React from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Button, Right, Left, Body, Icon, Text, List, ListItem, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';

import { updateRoute } from './actions/route';
import { addWeight } from './actions/weights';

const required = value => (value ? undefined : 'This field is required.')

const WeightField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <InputGroup>
    <Icon name="ios-man" style={{ color: '#333' }} />
    <Input placeholder={label} keyboardType="numeric" {...input} {...custom} autoFocus />
  </InputGroup>
)

const WeightForm = (props) => (
  <Container>
    <Header>
      {
        props.weights.length > 0 &&
          <Button
            onPress={() => props.updateRoute("/")}
            transparent
          >
            <Icon name='md-arrow-back' style={{ color: "#333" }} />
          </Button>
      }
      <Body />
      {
        props.valid ?
          <Button
            onPress={props.handleSubmit}
            transparent
          >
            <Text style={{ color: "#333" }}>Save</Text>
          </Button>
        : null
      }
    </Header>
    <Content>
    <List>
     <ListItem>
       <Field
         name="weight"
         component={WeightField}
         type="number"
         validate={[required]}
         label={"WEIGHT"}
       />
     </ListItem>
    </List>
    </Content>
  </Container>
)

const mapStateToProps = (state) => (
  {
    weights: state.weights
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    updateRoute: (route) => (dispatch(updateRoute(route))),
    onSubmit: (weight) => {
      dispatch(addWeight(weight));
      dispatch(updateRoute("/"));
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "weight" })(WeightForm));
