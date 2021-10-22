import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';


const Results = () => {
    const { results, loading, fetchResults, searchTerm } = useResultContext();
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            if (location.pathname === '/videos') {
                fetchResults(`/search/q=${searchTerm} videos`)
            } else {
                fetchResults(`${location.pathname}/q=${searchTerm}&=100`)
            }
        }
        fetchResults('/images/q=Bayer Munich&=40');
    }, [searchTerm, location.pathname]);

    if (loading) return <Loading />;

    switch (location.pathname) {
        // case '/search':
        //     return (
        //         <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
        //             {results?.map(({ link, title, description }, index) => (
        //                 <div key={index} className="w-full md:w-2/5">
        //                     {console.log(results.results)}
        //                     <a href={link} target="_blank" rel="noreferrer">
        //                         <p className="text-md dark:text-white-500 ">
        //                             {link.lenght > 10 ? link.substring(0, 10) : link}
        //                         </p>
        //                         <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
        //                             {title}
        //                         </p>
        //                         <p className="text-sm hover:underline dark:text-gray-300 text-gray-700">
        //                             {description}
        //                         </p>
        //                     </a>
        //                 </div>
        //             ))}
        //         </div>
        //     );
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: { href, title } }, index) => (
                        <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                            <img src={image?.src} alt={title} loading="lazy" />
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                        </a>
                    ))}
                </div>
            );
        case '/videos':
            return (
                <div className="flex flex-wrap">
                    {results?.map((video, index) => (
                        <div key={index} className="p-2">
                            <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px" />
                        </div>
                    ))}
                </div>
            )
        case '/news':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
                    {results?.map(({ links, id, source, title }) => (
                        <div key={id} className="w-full md:w-2/5">
                            <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                                <div className="flex gap-4">
                                    <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline">
                                        {source?.href}
                                    </a>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            );
        default:
            return 'No results found';
    }
}

export default Results;
