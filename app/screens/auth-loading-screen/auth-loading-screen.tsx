import * as React from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"

import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { UserStore } from "../../models/user-store"

const SCREEN: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export interface AuthLoadingScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
}

@inject("userStore")
@observer
export class AuthLoadingScreen extends React.Component<AuthLoadingScreenProps, {}> {
  componentDidMount() {
    this.checkAuthState()
  }

  async checkAuthState() {
    const {
      currentUser: likeCoUser,
      authCore: {
        profile: authcoreUser,
      },
      iapStore: {
        hasSubscription,
      },
    } = this.props.userStore
    if (authcoreUser && likeCoUser) {
      try {
        await Promise.all([
          this.props.userStore.fetchUserInfo(),
          this.props.userStore.authCore.fetchCurrentUser(),
        ])
        // Restore IAP if neccessary
        if (hasSubscription) {
          await this.props.userStore.iapStore.restorePurchases()
        }
        this.props.navigation.navigate('App')
        return
      } catch {
        // No-op
      }
    }
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <Screen
        style={SCREEN}
        preset="fixed"
        backgroundColor={color.primary}
      >
        <ActivityIndicator
          color={color.palette.white}
          size="large"
        />
      </Screen>
    )
  }
}
