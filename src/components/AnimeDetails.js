import { memo } from "react";
import '../styles/animeDetails.css';
import HorizontalCarousel from './HorizontalCarousel';

const AnimeDetails = ({ anime }) => {
    // const animeColor = anime.coverImage.color ? anime.coverImage.color : 'grey';
    // const englishtTitle = anime.title.english ? anime.title.english : 'TBD';
    // const format = anime.format ? anime.format : 'NA';
    const releaseDate = `${anime.startDate.day ? `${anime.startDate.day}/` : ''}${anime.startDate.month ? `${anime.startDate.month}/` : ''}${anime.startDate.year ? anime.startDate.year : 'NA'}`;
    const episodes = `${anime.nextAiringEpisode ? `${anime.nextAiringEpisode.episode - 1}/` : ''}${anime.episodes ? anime.episodes : 'NA'}`;
    const duration = anime.duration ? `${Math.floor(anime.duration / 60)}h ${Math.floor(anime.duration) % 60}m` : 'NA';
    // const season = anime.season ? anime.season : 'NA';

    return (
        <>
            <div className="anime-cover" style={{ '--anime-color': anime.coverImage.color }}>
                <img className="bannerImage" src={anime.bannerImage} alt={anime.title.romaji} />

                <div className="anime-info">
                    <img src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                    <div className="anime-info-right">
                        <p className="anime-title"> {anime.title.english || 'TBD'} </p>
                        <p className="anime-title-romaji"> {anime.title.romaji} </p>
                        <p className="anime-desc" dangerouslySetInnerHTML= {{__html:anime.description || 'No description' }} />
                        <div className="anime-info-details">
                            <div className="anime-info-details-list">

                                <p> Format: <strong> {anime.format || 'NA'} </strong> </p>

                                <p> Release Date: <strong> {releaseDate} </strong> </p>

                                <p> Status: <strong> {anime.status || 'NA'} </strong> </p>

                                <p> Studios: <strong>
                                    {anime.studios.edges.map((studio, i) => (
                                        studio.node.name
                                    ))}
                                </strong> </p>

                            </div>
                            <div className="anime-info-details-list">

                                <p> Episodes: <strong> {episodes} </strong> </p>

                                <p> Duration: <strong> {duration} </strong> </p>

                                <p> Season: <strong> {anime.season || 'NA'} </strong> </p>

                                <div className="anime-info-genres-list">
                                    <p>Genres: </p>
                                    {anime.genres.map((genre, i) => (
                                        <div key={i} className="anime-info-genres"> {genre} </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <HorizontalCarousel animeList={anime.relations.edges} heading = 'RELATED ANIMES' carouselId = 'relations' />
            <HorizontalCarousel animeList={anime.recommendations.edges} heading = 'RECOMMENDED ANIMES' carouselId = 'recommendations' />

        </>
    );
};

export default memo(AnimeDetails);
