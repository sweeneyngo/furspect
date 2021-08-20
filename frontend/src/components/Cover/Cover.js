import React from 'react';
import { radialGrid } from '../../components/Layout/layout.module.css';
import rabbit640 from '../../images/rabbit640.png';

const Cover = () => {
    return (
        <div className="border-gray-200 relative border-b-2 h-screen overflow-hidden">
            <img src={rabbit640} className="absolute inset-y-0 right-0 z-10" />
            <div className={radialGrid}></div>
            <div className="flex relative">
                <div className="flex flex-col">
                    <p className="text-gray-300 text-md mt-8 transform translate-y-3">
                        /fər&apos;spekt/
                    </p>
                    <h1 className="text-gray-300 text-7xl mb-8">
                        an inspection of
                        <br />
                        anthromorphism.
                    </h1>
                    <p className="text-gray-t-10 500 mt-2 mb-14 w-2/5">
                        Welcome to furspect! You&apos;re welcome to explore and
                        investigate the ultimate dilemna of whether your
                        favorite character/figure is a furry or not (we are not
                        responsible for any relationships that may be broken as
                        a result of our analysis). For the inspection process,
                        upload an image or photo and we&apos;ll determine if
                        it&apos;s certainly an anthromorphic animal or not!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;
