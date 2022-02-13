import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "../App";
import Main from "../containers/Main/Main";
import Home from "../components/Home/Home";
import CountryDetail from "../components/CountryDetail/CountryDetail";
import AddActivity from "../components/AddActivity/AddActivity";
import Nav from "../containers/Nav/Nav";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const routes = ["/", "/home", "/country/:id", "/newActivity"];
  const mockStore = configureStore([thunk]);
  const state = {
    countries: [],
    countryDetail: {},
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  it('El componente "Main" deberia ser renderizado en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Main)).toHaveLength(1);
  });
  it('El componente "Home y Nav" deberia ser renderizado en la ruta "/home"', async () => {
    const app = await mount(componentToUse(routes[1]));
    expect(app.find(Home)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });
  it('El componente "CountryDetail y Nav" deberia ser renderizado en la ruta "/country/:id"', async () => {
    const app = await mount(componentToUse(routes[2]));
    expect(app.find(CountryDetail)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });
  it('El componente "addActivity y Nav" deberia ser renderizado en la ruta "/newActivity"', async () => {
    const app = await mount(componentToUse(routes[3]));
    expect(app.find(AddActivity)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });
});
