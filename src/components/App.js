import { Grid } from 'semantic-ui-react';
import ColorPanel from "../components/ColorPanel/ColorPanel"
import Messages from "../components/Messages/Messages"
import SidePanel from "../components/SidePanel/SidePanel"
import MetaPanel from "../components/MetaPanel/MetaPanel"
import "./App.css";

const App = () => {
    return (
        <Grid columns="equal" className="app" style={{background: "#eee"}}>
            <ColorPanel />
            <SidePanel />

            <Grid.Column style={{marginLeft: 320}}>
              <Messages />
            </Grid.Column>

            <Grid.Column width={4}>
             <MetaPanel />
            </Grid.Column>
        </Grid>
    )
}

export default App;

