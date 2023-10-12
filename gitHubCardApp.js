/* styles:

.github-profile {
    margin: 1rem;
  img {
    width: 75px;
  }
  .info {
    display: inline-block;
    margin-left: 12px;
        .name {
        font-size: 1.25rem;
      font-weight: bold;
    }
  }
}

form {
    border: thin solid #ddd;
  background-color: #fbfbfb;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.header {
    text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

*/

const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

// Form component
class Form extends React.Component {
  // userNameInput = React.createRef();
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault(); // so page doesnt refresh on click
    // this.userNameInput.current.value;
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="GitHub username"
          // ref={this.userNameInput}
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

// CardList
// const CardList = (props) => (
//     <div>
//         <Card {...testData[0]} /> // When we use the spread operator with an object like this in a react component, all the properties of that object will become props for this component.
//         <Card {...testData[1]} />
//     </div>
// );

// CardList
const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}{" "}
    // map converting testData into [<card />, <card />, <card />] and array of
    card elements is [React.createElement, React.createElement] calls.
  </div>
);

// Card Component
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

// Class Component : in class component, state is also managed on the in-memory instance that react associates with every mounted component.
class App extends React.Component {
  // constructor: instead of receiving props as args, both the props and the state are managed on an instance of the class.
  constructor(props) {
    super(props);
    this.state = {
      profiles: testData,
    };
  }

  // instead of all the extra code above, we can directly use state class field
  state = {
    // it gets converted by Babel to normal JS that browser understands.
    profiles: testData,
  };

  addNewProfile = (newProfile) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, newProfile],
    }));
  };

  // render: every class component must have a render function
  render() {
    return (
      <>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </>
    );
  }
}

root.render(<App title="The GitHub Cards App" />);
