import React from 'react'
import BlogItem from '../blog/blog-item.component'


class BlogDirectory extends React.Component {
    constructor() {
        super();
        this.state = {
            sections: [
                {
                    imageUrl: '../image/blogGlass-learn.png',
                    id: 1,
                    title:'آسان ترین روش آموزش نصب گلس سرامیکی',
                    description:'شهر گلس قصد دارد تا با آموزش نصب گلس انواع گلس از جمله آموزش نصب گلس سرامیکی به شما کمک کند تا بتوانید خودتان گلس را روی گوشی نصب کرده و از مراجعه به مغازه و بازار خودداری کنید.',
                    url:'https://blog.shahr-glass.ir/nasb-ceramic-simple/'

                },
                {
                    imageUrl: '../image/shahrglass-blog2.png',
                    id: 2,
                    title:'محافظ صفحه نمایش نانو لبتاب چه فایده ای دارد؟',
                    description:'اگر جزوکسانی هستید که کار و بازی یا آموزش تان بیشتر بوسیله ی لبتاب انجام می شود به شما نصب...',
                    url:'https://blog.shahr-glass.ir/%d9%85%d8%ad%d8%a7%d9%81%d8%b8-%d8%b5%d9%81%d8%ad%d9%87-%d9%86%d9%85%d8%a7%db%8c%d8%b4-%d9%86%d8%a7%d9%86%d9%88-%d9%84%d8%a8%d8%aa%d8%a7%d8%a8-nano-protector-laptop/'
                },
                {
                    imageUrl: '../image/shahrglass-blog3.png',
                    id: 3,
                    title:'گلس آنتی باکتریال Elite VisionGuard',
                    description:'در روزهایی که نگران سلامت خود و اعضای خانواده ی خود در برابر خطر ویروس ها و باکتری ها هستید ، معرفی یک گلس آنتی باکتریال می تواند بسیار امید بخش باشد.',
                    url:'https://blog.shahr-glass.ir/%da%af%d9%84%d8%b3-%d8%a2%d9%86%d8%aa%db%8c-%d8%a8%d8%a7%da%a9%d8%aa%d8%b1%db%8c%d8%a7%d9%84-antibacterial-glass-protector/'
                }
               
            ]
        }
    }

    render() {
        return (
           <React.Fragment>
                {this.state.sections.map(({id, ...otherSectionProps}) => (
                    <BlogItem key={id} {...otherSectionProps} />
                ))}
           </React.Fragment>
        )
    }
}

export default BlogDirectory;