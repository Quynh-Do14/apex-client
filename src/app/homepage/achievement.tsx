'use client'
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';
import React, { useEffect, useRef, useState } from 'react'
import '@/assets/styles/pages/home/achievement.css'

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}
const AchieveSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: number]: number }>({});
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const configContent: ConfigPageInterface[] = configPage.filter(item => item.type === type);

    return (
        <div className="stats-bar-modern" ref={sectionRef}>
            <div className="stats-container-modern">
                {configContent.map((stat: ConfigPageInterface, index: number) => (
                    <div key={index} className="stat-item-modern">
                        <div className="stat-number-modern">
                            <article dangerouslySetInnerHTML={{ __html: stat.title }} />
                        </div>
                        <div className="stat-label-modern">{stat.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchieveSection