import React from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props: {
            results: [1,2,3],
        },
    };
};

function Page({results}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(results)
    return (
        <div className="app__page header">page here</div>
    )
}

export default Page;