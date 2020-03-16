import { ViewStyle } from "react-native"
import { SwipeRow } from "react-native-swipe-list-view"

import { Content } from "../../models/content"
import { Creator } from "../../models/creator"

export interface ContentListItemProps {
  content: Content

  creator?: Creator

  /**
   * Set to false to hide the bookmark icon. Default is true.
   */
  isShowBookmarkIcon?: boolean

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * A callback when the item is pressed.
   */
  onPress?: (url: string) => void

  /**
   * A callback when the bookmark button is pressed.
   */
  onToggleBookmark?: (url: string) => void

  /**
   * A callback when the follow button is pressed.
   */
  onToggleFollow?: (content: Content) => void

  /**
   * A callback when the undo button is pressed.
   */
  onPressUndoButton?: (content: Content) => void

  /**
   * A callback when the undo button is pressed.
   */
  onSwipeOpen?: (key: string, ref: React.RefObject<SwipeRow<{}>>) => void

  /**
   * A callback when the undo button is pressed.
   */
  onSwipeClose?: (key: string) => void
}
