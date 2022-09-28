import React from "react"
import ContentLoader from "react-content-loader"



const Skeleton: React.FC = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f2f2f2"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="572" y="579" rx="0" ry="0" width="9" height="1" />
        <circle cx="128" cy="127" r="86" />
        <rect x="19" y="240" rx="10" ry="10" width="217" height="33" />
        <rect x="18" y="300" rx="15" ry="15" width="219" height="95" />
        <rect x="19" y="421" rx="12" ry="12" width="68" height="27" />
        <rect x="107" y="416" rx="15" ry="15" width="129" height="44" />
    </ContentLoader>
    // разобраться с размерами!!!
)

export default Skeleton