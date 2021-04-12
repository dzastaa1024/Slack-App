import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";

const UserPanel = () => {

    const dropdownOptions = () => [
        {
            key:"user",
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key:"avatar",
            text: <span>Change Avatar</span>,
        },
        {
            key:"signout",
            text: <span onClick={handleSignout}>Sign Out</span>,
        },
    ]

    const handleSignout = () => {
        firebase
        .auth()
        .signOut()
        .then(()=>{
            console.log("sign out")
        })
    }

    return (
        <Grid style={{background:"#4c3c4c"}} >
          <Grid.Column>
              <Grid.Row style={{padding:"1.2em", margin: 0}}>
                  {/* App Header */}
                <Header inverted flated="left" as="h2">
                    <Icon />
                    <Header.Content>DevChat</Header.Content>
                </Header>
              </Grid.Row>

              {/* User Dropdown */}
              <Header style={{padding:"0.25em"}} as="h4">
                  <Dropdown trigger={<span>User</span>} options={dropdownOptions()}/>
              </Header>
          </Grid.Column>
        </Grid>
    )
}

export default UserPanel;