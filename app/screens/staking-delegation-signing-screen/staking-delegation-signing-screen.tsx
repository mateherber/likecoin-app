import * as React from "react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"

import { StakingDelegationStore } from "../../models/staking-delegation-store"
import { ChainStore } from "../../models/chain-store"
import { RootStore } from "../../models/root-store"
import { Validator } from "../../models/validator"

import { Button } from "../../components/button"
import { SigningView } from "../../components/signing-view"

import { spacing } from "../../theme"

import { logAnalyticsEvent } from "../../utils/analytics"

import Graph from "../../assets/graph/staking-delegate.svg"

const GRAPH: ViewStyle = {
  marginRight: 20,
}
const ABOUT_LINK_BUTTON: ViewStyle = {
  marginTop: spacing[3],
}

export interface StakingDelegationSigningScreenProps extends NavigationScreenProps<{}> {
  txStore: StakingDelegationStore,
  chain: ChainStore,
}

@inject((rootStore: RootStore) => ({
  txStore: rootStore.stakingDelegationStore,
  chain: rootStore.chainStore,
}))
@observer
export class StakingDelegationSigningScreen extends React.Component<StakingDelegationSigningScreenProps, {}> {
  private sendTransaction = async () => {
    await this.props.txStore.signTx(this.props.chain.wallet.signer)
    if (this.props.txStore.isSuccess) {
      logAnalyticsEvent('DelegateBoundSuccess')
      this.props.chain.fetchBalance()
      this.props.chain.fetchValidators()
    }
  }

  private onPressCloseButton = () => {
    this.props.navigation.goBack()
  }

  private onPressConfirmButton = () => {
    logAnalyticsEvent('DelegateConfirmBoundTx')
    if (this.props.txStore.isSuccess) {
      this.props.navigation.dismiss()
    } else {
      this.sendTransaction()
    }
  }

  render () {
    const {
      amount,
      blockExplorerURL,
      errorMessage,
      fee,
      signingState: state,
      target,
      totalAmount,
    } = this.props.txStore
    const { formatDenom } = this.props.chain
    const { avatar, moniker: name }: Validator = this.props.chain.validators.get(target)

    return (
      <SigningView
        type="stake"
        state={state}
        titleTx="stakingDelegationSigningScreen.title"
        amount={formatDenom(amount)}
        txURL={blockExplorerURL}
        error={errorMessage}
        fee={formatDenom(fee)}
        target={{ avatar, name }}
        totalAmount={formatDenom(totalAmount)}
        graph={<Graph />}
        graphStyle={GRAPH}
        bottomNavigationAppendChildren={(
          <Button
            preset="link"
            tx="stakingDelegationSigningScreen.aboutLinkText"
            link="http://bit.ly/34h2KhF"
            color="greyBlue"
            weight="400"
            style={ABOUT_LINK_BUTTON}
          />
        )}
        onClose={this.onPressCloseButton}
        onConfirm={this.onPressConfirmButton}
      />
    )
  }
}
