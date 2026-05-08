"use client";
import styles from "@/assets/styles/pages/blog/slugBlog.module.css";

interface Props {
    tocItems: { id: string; text: any; level: number; }[]
}

const TocBlog = ({ tocItems }: Props) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    };

    const generateNumbering = (items: { id: string; text: any; level: number; }[]) => {
        const numbering: any[] = [];
        const counters = [0, 0, 0]; // Cho h2, h3

        items.forEach(item => {
            if (item.level === 2) {
                counters[1] = 0; // Reset h3 counter khi gặp h2 mới
                counters[0]++;
                numbering.push(`${counters[0]}`);
            } else if (item.level === 3) {
                counters[1]++;
                numbering.push(`${counters[0]}.${counters[1]}`);
            }
        });

        return numbering;
    };

    return (
        <div className={styles.newsTOC}>
            <p className={styles.title}>Mục lục bài viết</p>
            <ul>
                {(() => {
                    const numbering = generateNumbering(tocItems);
                    return tocItems.map((item, index) => (
                        <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 12}px` }}>
                            <div onClick={() => scrollToSection(item.id)}>
                                <article
                                    id={`tocItem-${item.id}`}
                                    style={{ padding: '2px 0', cursor: "pointer" }}
                                    dangerouslySetInnerHTML={{ __html: `<strong>${numbering[index]}</strong>. ${item.text}` }}
                                />
                            </div>
                        </li>
                    ));
                })()}
            </ul>
        </div>
    );
};

export default TocBlog;