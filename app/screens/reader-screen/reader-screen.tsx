import * as React from "react"
import { ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { inject, observer } from "mobx-react"

import { Screen } from "../../components/screen"

import { color } from "../../theme"

import { ReaderStore } from "../../models/reader-store"
import { ContentList } from "../../components/content-list"

import { logAnalyticsEvent } from "../../utils/analytics"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  ...FULL,
  alignItems: "stretch",
}

export interface ReaderScreenProps extends NavigationScreenProps<{}> {
  readerStore: ReaderStore,
}

@inject("readerStore")
@observer
export class ReaderScreen extends React.Component<ReaderScreenProps> {
  list = React.createRef<ContentList>()

  componentDidMount() {
    this.list.current.props.onRefresh()
  }

  private onPressContentItem = (id: string) => {
    const content = this.props.readerStore.contents.get(id)
    logAnalyticsEvent('select_content', { contentType: 'content', itemId: id })
    // logAnalyticsEvent('OpenArticle', { url: id })
    this.props.navigation.navigate('ContentView', { content })
  }

  render() {
    return (
      <Screen
        style={CONTAINER}
        preset="fixed"
        backgroundColor={color.palette.white}
        unsafe={true}
      >
        {this.renderList()}
      </Screen>
    )
  }

  private renderList = () => {
    switch (this.props.navigation.state.routeName) {
      case "Featured":
        return (
          <ContentList
            ref={this.list}
            data={this.props.readerStore.featuredList}
            creators={this.props.readerStore.creators}
            titleLabelTx="readerScreen.featuredLabel"
            hasFetched={this.props.readerStore.hasFetchedFeaturedList}
            lastFetched={this.props.readerStore.featuredListLastFetchedDate.getTime()}
            isLoading={this.props.readerStore.isFetchingFeaturedList}
            onPressItem={this.onPressContentItem}
            onRefresh={this.props.readerStore.fetchFeaturedList}
          />
        )

      case "Followed":
        return (
          <ContentList
            ref={this.list}
            data={this.props.readerStore.followedList}
            creators={this.props.readerStore.creators}
            titleLabelTx="readerScreen.followingLabel"
            isLoading={this.props.readerStore.isFetchingFollowedList}
            isFetchingMore={this.props.readerStore.isFetchingMoreFollowedList}
            hasFetched={this.props.readerStore.hasFetchedFollowedList}
            hasFetchedAll={this.props.readerStore.hasReachedEndOfFollowedList}
            lastFetched={this.props.readerStore.followedListLastFetchedDate.getTime()}
            onFetchMore={this.props.readerStore.fetchMoreFollowedList}
            onPressItem={this.onPressContentItem}
            onRefresh={this.props.readerStore.fetchFollowedList}
          />
        )
    }
    return null
  }
}
