import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// This component lazy-loads images for better performance.
// No changes are needed here.
const Img = ({ src, className, alt }) => {
    return (
        <LazyLoadImage
            className={className || ''}
            alt={alt || 'Image'}
            effect='blur' // Adds a nice blur-up effect while loading
            src={src}
        />
    )
}

export default Img