import React from 'react';

function Home() {
    return (
        <div className="container">
            <section className="hero row text-center">
                <h1 id="hero-text" className="col-6 mt-auto mb-auto">MAKING<br />PETITIONING<br /><span id="hero-highlight">SIMPLE</span></h1>
            </section>
            <section className="copy row">
                <article className="copy-article col-md-6 p-0 d-inline-block" id="coordinator">
                    <h2 className="text-left p-2 font-weight-lighter" id="left">Coordinators</h2>
                    <ul>
                        <li className="list-unstyled p-2"><strong>Faster Turn-ins</strong></li>
                        <li className="list-unstyled">
                            <ul>
                                <li>Easily find petition and circulator information</li>
                                <li>Calculate payments faster</li>
                                <li>Track back-end payments effortlessly</li>
                            </ul>
                        </li>

                    </ul>
                </article>
                <article className="copy-article col-md-6 p-0 d-inline-block" id="circulators">
                    <h2 className="text-left p-2 font-weight-lighter" id="right">Circulators</h2>
                    <ul>
                        <li className="list-unstyled p-2"><strong>Track and understand your petition data</strong></li>
                        <li className="list-unstyled">
                            <ul>
                                <li>View payment history</li>
                                <li>Estimate your earnings</li>
                                <li>View your stats</li>
                            </ul>
                        </li>
                    </ul>
                </article>
            </section>
        </div>
    )
}

export default Home;