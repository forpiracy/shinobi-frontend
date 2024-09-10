import TrendingCarousel from '../components/TrendingCarousel';
import HorizontalCarousel from '../components/HorizontalCarousel';
import VerticalCarousel from '../components/VerticalCarousel';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchHomeAnime } from '../services/fetchHomeAnime';

function Home() {
    console.log('home');
    // sessionStorage.setItem('home', JSON.stringify(data.data));
    // const [l, sl] = useState(true);
    // const [animeHome, setAnimeHome] = useState();
    // useEffect(()=>{
    //     if(sessionStorage.getItem('home')){
    //         const fetch = async () => {
    //             console.log('found');
    //             // console.log( sessionStorage.getItem('home'));
    //             const response = sessionStorage.getItem('home');
    //             const d =JSON.parse (response);
    //             // console.log(d);
    //             setAnimeHome(d);
    //             sl(false);
    //         }
    //         fetch();
    //     }
    //     else{
    //         const fetch = async () =>{
    //             setAnimeHome(await fetchAnimeHome());
    //             console.log(animeHome);
                
    //             sl(false);
    //         }
    //         fetch();
    //     }
    // }, []);
    // if(l)return <h2>Loading ...</h2>


    const { data: animeHome, error } = useSWR(
        'home',
        fetchHomeAnime,
        {
            refreshInterval: 0,            // Disable auto-revalidation
            revalidateOnFocus: false,      // Disable revalidation on focus
            revalidateOnReconnect: false,  // Disable revalidation on network reconnect
            dedupingInterval: Infinity,    // Prevent revalidation by setting deduplication to Infinity
            revalidateIfStale: false,      // Disable revalidation if data is stale
            errorRetryInterval: 5000 ,
            errorRetryCount: 2,
        }
    );
    if (error) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Failed to load Home Page</h2>;
    if (!animeHome) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Loading Home Page ...</h2>;

    return (
        <>
            <TrendingCarousel animeList={animeHome.trending.media} />
            <HorizontalCarousel animeList={animeHome.topAiring.media} heading='TOP AIRING' carouselId='anime' />
            <HorizontalCarousel animeList={animeHome.seasonalPopular.media} heading='SEASONAL POPULAR' carouselId='anime' />
            <div className="four" style={{ 'display': 'flex', 'justifyContent': 'space-between', 'margin': '10px' }}>
                <VerticalCarousel animeList={animeHome.topRated.media} heading='TOP RATED' />
                <VerticalCarousel animeList={animeHome.mostPopular.media} heading='MOST POPULAR' />
                <VerticalCarousel animeList={animeHome.mostFavorite.media} heading='MOST FAVORITE' />
                <VerticalCarousel animeList={animeHome.upcomingPopular.media} heading='UPCOMING POPULAR' />
            </div>
        </>
    );
}

export default Home;