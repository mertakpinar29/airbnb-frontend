import React from 'react'
import { sanityClient, urlFor } from '../sanity'
import Link from 'next/link'
import DashboardMap from '../components/DashboardMap'
const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className='main'>
          <div className='feed-container'>
            <h1>Places to stay near you</h1>
            <div className='feed'>
              {properties.map((property) => (
                <Link href={`/property/${property.Slug.current}`}>
                  <div key={property._id} className='card'>
                    <img src={urlFor(property.mainImage)} />
                    <p>{property.reviews.length} reviews</p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>TL{property.pricePerNight}</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='map'>
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default Home
