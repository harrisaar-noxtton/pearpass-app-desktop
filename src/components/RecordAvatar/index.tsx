// index.tsx
import React from 'react'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  AvatarAlt,
  AvatarContainer,
  AvatarImage,
  AvatarSize,
  FavoriteIcon,
  RetryBadge,
  SelectedAvatarContainer,
  Spinner
} from './styles'
import { CheckIcon, StarIcon, SyncingIcon } from '../../lib-react-components'
import { useFavicon } from 'pearpass-lib-vault'

interface Props {
  websiteDomain: string
  initials: string
  size: AvatarSize
  isSelected: boolean
  isFavorite: boolean
  color: string
  testId?: string
}

export const RecordAvatar = (props: Props): React.ReactElement => {
  const { websiteDomain, initials, size, isSelected, isFavorite, color, testId } = props

  const { faviconSrc, isLoading, error, retry } = useFavicon({ url: websiteDomain })

  React.useEffect(() => {
    if (error) {
      console.log(`[RecordAvatar] Effect: Error set to:`, error)
    }
  }, [error])

  const handleRetry = (): void => {
    console.log(`[RecordAvatar] Firing Retry for ${websiteDomain}`)
    if (retry) retry()
  }

  if (isSelected) {
    return (
      <SelectedAvatarContainer data-testid={`${testId}-selected`}>
        <CheckIcon size="21" color={colors.black.mode1} />
      </SelectedAvatarContainer>
    )
  }

  const isFaviconLoaded = faviconSrc && !isLoading

  return (
    <AvatarContainer size={size} data-testid={testId}>
      {isFaviconLoaded && <AvatarImage src={faviconSrc} />}

      {!isLoading && !isFaviconLoaded && (
        <AvatarAlt color={color} size={size}>
          {initials}
        </AvatarAlt>
      )}

      {isLoading && <Spinner size={size} color={color} />}

      {error && !isLoading && (
        <RetryBadge onClick={handleRetry} title="Failed to load favicon. Click to retry." size={size}>
          <SyncingIcon size={size === 'sm' ? "10" : "12"} color={colors.white.mode1} />
        </RetryBadge>
      )}

      {isFavorite && (
        <FavoriteIcon data-testid={`avatar-favorite-${initials}`}>
          <StarIcon size="18" fill={true} color={colors.primary400.mode1} />
        </FavoriteIcon>
      )}
    </AvatarContainer>
  )
}
