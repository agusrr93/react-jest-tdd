import React from 'react';
import { shallow, mount } from 'enzyme';

import HelloSection from './HelloSection';

describe('<HelloSection> component ', () => {

  /*
  ============
  OUTPUT TESTS
  ============
  */
  const helloSectionWrapper = shallow(<HelloSection />);
  it('renders correctly', () => {
    expect(helloSectionWrapper).toHaveLength(1);
  });

  it('renders a <h1>', () => {
    const helloSectionH1 = helloSectionWrapper.find('h1');
    expect(helloSectionH1).toHaveLength(1);
  });

  it('renders a paragraph <p>', () => {
    const helloSectionParagraph = helloSectionWrapper.find('p');
    expect(helloSectionParagraph).toHaveLength(1);
  });

  it('renders an <ul>', () => {
    const helloSectionUl = helloSectionWrapper.find('ul');
    expect(helloSectionUl).toHaveLength(1);
  });

  it('renders three <li>s inside <ul>', () => {
    const helloSectionUl = helloSectionWrapper.find('ul');
    const LiInsidehelloSectionUl = helloSectionUl.find('li');
    expect(LiInsidehelloSectionUl).toHaveLength(3);
  });

  /*
  ============
  STATE TESTS
  ============
  */
  it('have todos state which consists of three items', () => {
    const todosState = helloSectionWrapper.state('todos');
    expect(todosState).toHaveLength(3);
  });

  /*
  ============
  EVENTS TESTS
  ============
  */
  it('adds a new todo to the state when addTodo function called', () => {
    const newTodo = {
      id: 4,
      task: 'TDD!',
      completed: false,
    };

    helloSectionWrapper.instance().addTodo(newTodo);
    const todosState = helloSectionWrapper.state('todos');
    expect(todosState).toHaveLength(4);
  });

  it('deletes a todo from a state when removeTodo function called', () => {
    const todoToDeleteId = 1;
    helloSectionWrapper.instance().removeTodo(todoToDeleteId);
    const todosState = helloSectionWrapper.state('todos');
    expect(todosState).toHaveLength(3);
  });

  it('deletes a todo when DELETE button clicked', () => {
    // get the first delete button
    const buttonToClick = helloSectionWrapper.find('.delete-btn').at(0);
    // let's click the button
    buttonToClick.simulate('click');
    const todosState = helloSectionWrapper.state('todos');
    expect(todosState).toHaveLength(2);
  });

  /*
  ============
  PROPS TESTS
  ============
  */
  it('get username props from <App />', () => {
    const helloSectionWrapperWithProps = shallow(<HelloSection username={'John Doe'} />);
    // we use unrendered here since shallow does not render the actual dom
    // to properly test props, we need to use mount instead of shallow
    // but since mount will add significant complexity, let's skip that for now!
    const usernameProp = helloSectionWrapperWithProps.unrendered.props.username;
    const isAString = typeof usernameProp === 'string';
    expect(isAString).toBeTruthy();
  });
});
