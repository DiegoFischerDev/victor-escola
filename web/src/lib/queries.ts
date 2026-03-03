export const homePageQuery = `
*[_type == "pageHome"][0]{
  _id,
  title,
  "heroRef": hero,
  seoTitle,
  seoDescription,
  hero->{
    eyebrow,
    title,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    highlights[] {
      label
    },
    heroImage{
      "url": asset->url
    },
    heroVideo{
      "url": asset->url
    }
  },
  about->{
    title,
    subtitle,
    mission,
    vision,
    values,
    image{
      "url": asset->url
    },
    "content": content[]{
      ...,
      _type == "block" => {
        ...
      }
    },
    highlightStats[]{
      label,
      value
    }
  },
  segments->{
    title,
    subtitle,
    segments[]{
      name,
      ageRange,
      description,
      highlights,
      icon{
        "url": asset->url
      }
    }
  },
  differentiators->{
    title,
    subtitle,
    items[]{
      title,
      description
    }
  },
  testimonials->{
    title,
    subtitle,
    testimonials[]{
      name,
      role,
      content,
      avatar{
        "url": asset->url
      }
    }
  },
  structure->{
    title,
    subtitle,
    description,
    items[]{
      title,
      description,
      image{
        "url": asset->url
      }
    }
  },
  contact->{
    title,
    subtitle,
    phone,
    whatsapp,
    email,
    address,
    mapsUrl,
    openingHours,
    formIntro
  }
}
`;

