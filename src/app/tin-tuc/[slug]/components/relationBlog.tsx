import styles from "@/assets/styles/pages/blog/slugBlog.module.css";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import { BlogInterface } from "@/infrastructure/interface/blog/blog.interface";
import Image from "next/image";
import Link from "next/link";
type Props = {
    relatedBlogs: BlogInterface[]
}
const RelationBlogComponent = (props: Props) => {
    const { relatedBlogs } = props;

    return (
        <div className={styles.newsGrid}>
            <p className={styles.title}>Bài viết tương tự</p>
            {relatedBlogs.map(article => (
                <Link href={`${ROUTE_PATH.BLOG}/${article?.slug}.html`} key={article.id} className={styles.newsCard}>
                    <div className={styles.cardImage}>
                        <Image
                            src={configImageURL(article.image)}
                            alt={article.title}
                            width={30}
                            height={100}
                            className={styles.cardImage}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className={styles.cardOverlay}></div>
                    </div>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{article.title}</h3>
                        <p className={styles.cardExcerpt}>{article.short_description}</p>
                        <div className={styles.cardMeta}>
                            <div className={`${styles.metaItem} flex items-center gap-2`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>{convertDateOnlyShow(article.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RelationBlogComponent