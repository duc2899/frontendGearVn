import React from "react";

const TechnologyNews = () => {
  const data = [
    {
      id: 1,
      image:
        "https://file.hstatic.net/200000722513/article/gearvn-bard-ai-la-gi-tim-hieu-dac-diem-va-cach-su-dung-google-bard-11_258b80b85f574ef8b6810e7c959da2d6_grande.png",
      title: "Bard AI là gì Tìm hiểu đặc điểm và cách sử dụng Google Bard",
    },
    {
      id: 2,
      image:
        "https://file.hstatic.net/200000722513/article/purple_and_blue_anime_light_night_playlist_youtube_thumbnail__1__1f573727832f4632b1a594a74ee64def_grande.jpg",
      title: "Leonardo.ai: Sáng tạo ảnh AI miễn phí nhưng cực nghệ",
    },
    {
      id: 3,
      image:
        "https://file.hstatic.net/200000722513/article/gearvn-apple-one-la-gi-co-nen-su-dung-apple-one-1_7bc49bf03a104ca48cbbf3c024bf45e7_grande.png",
      title: "Game thủ có nên nâng cấp màn hình gaming OLED không?",
    },
    {
      id: 4,
      image:
        "https://file.hstatic.net/200000722513/article/gearvn-apple-one-la-gi-co-nen-su-dung-apple-one-1_7bc49bf03a104ca48cbbf3c024bf45e7_grande.png",
      title: "Apple One là gì? Có nên sử dụng Apple One?",
    },
  ];
  return (
    <div className="bg-white mt-3 p-2 mb-3 pb-4">
      <h1 className="text-3xl font-semibold mb-2">Tin tức công nghệ</h1>
      <div className="items-center gap-4 lg:flex-row flex flex-col">
        {data.map((item) => (
          <div key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded-md"
            ></img>
            <p className="font-medium text-lg ">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyNews;
