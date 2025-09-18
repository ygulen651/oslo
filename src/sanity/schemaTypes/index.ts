import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { sliderType } from './sliderType'
import { backgroundTextType } from './backgroundTextType'
import { secondSectionType } from './secondSectionType'
import { productType } from './productType'
import { backgroundImageType } from './backgroundImageType'
import { pdfSettingsType } from './pdfSettingsType'
import { videoSettingsType } from './videoSettingsType'
import { blogSettingsType } from './blogSettingsType'
import { menuType } from './menuType'
import { logoType } from './logoType'
import { productBarType } from './productBarType'
import { footerType } from './footerType'
import { certificateType } from './certificateType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    sliderType,
    backgroundTextType,
    secondSectionType,
    productType,
    backgroundImageType,
    pdfSettingsType,
    videoSettingsType,
    blogSettingsType,
    menuType,
    logoType,
    productBarType,
    footerType,
    certificateType,
  ],
}
