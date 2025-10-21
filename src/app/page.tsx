"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { SelectDemo } from "./components/forms";

export default function Home() {
  const [showScare, setShowScare] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerScare = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setShowScare(true);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center md:p-16 p-6 overflow-hidden">
      <audio ref={audioRef} src="/scary.mp3" preload="auto" />
      {showScare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-white text-6xl font-bold tracking-widest">
          <Image
            src="/scary.jpg"
            alt="scare"
            fill
            priority
            className="w-full h-full object-fill"
          />
        </div>
      )}

      <div className="bg-white rounded-2xl w-full max-w-2xl py-6  space-y-6 shadow-2xl z-10 border-y-12 border-blue-900 ">
        <div className="flex items-center justify-between md:px-8 px-12">
          <Image
            src={"/mcs-holding.png"}
            alt="logo"
            width={2000}
            height={2000}
            className="h-[32px] w-[230px]"
            priority
          />
          <Image
            src={"/techpackLogoDark.png"}
            alt="logo"
            width={2000}
            height={2000}
            className="hidden sm:block h-[70px] w-[160px]"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 px-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Сэтгэл ханамж болон оффис орчны судалгаа
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Та энэхүү судалгааг үнэн зөв, шударгаар бөглөнө үү. Хариултууд тань
            бидэнд байгууллагын соёлыг сайжруулахад тусална.
          </p>
        </div>

        <form className="space-y-6 text-black md:px-10 px-4 text-[14px]">
          {/* 1 */}
          <div>
            <label className="block font-medium mb-3">
              1. Танилцуулга — Таны нэр (хүсвэл хоосон орхиж болно)
            </label>
            <input
              type="text"
              placeholder="Enter your name (optional)"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 2 */}
          <div>
            <label className="block font-medium mb-3">
              2. Аль нэгж, хэлтэст харьяалагддаг вэ?
            </label>
            <input
              type="text"
              placeholder="Нэгжийн нэр"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 3 */}
          <SelectDemo
            label="3. Та ажлын ачааллаа хэрхэн үнэлэх вэ?"
            options={{
              option1: "Хэт их",
              option2: "Зохистой",
              option3: "Хэт бага",
            }}
          />

          {/* 4 */}
          <SelectDemo
            label="4. Таны удирдлагын зүгээс үзүүлж буй дэмжлэгийг хэрхэн үнэлэх вэ?"
            options={{
              option1: "Маш сайн",
              option2: "Сайн",
              option3: "Дунд",
              option4: "Муу",
              option5: "Маш муу",
            }}
          />

          {/* 5 */}
          <SelectDemo
            label="5. Ажлын орчин (офис, тоног төхөөрөмж, агаар, гэрэлтүүлэг гэх мэт) танд хэр таатай вэ?"
            options={{
              option1: "Маш таатай",
              option2: "Таатай",
              option3: "Дунд зэрэг",
              option4: "Тааламжгүй",
              option5: "Маш тааламжгүй",
            }}
          />

          {/* 6 */}
          <SelectDemo
            label="6. Ажлын хамт олон дунд уур амьсгал хэр байна вэ?"
            options={{
              option1: "Маш найрсаг",
              option2: "Найрсаг",
              option3: "Дунд",
              option4: "Хүйтэн",
              option5: "Сөрөг",
            }}
          />

          {/* 7 */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              7. Та ажлын байр, хангамжийн түвшинд сэтгэл хангалуун байна уу?
            </label>
            <input
              type="text"
              placeholder="Сэтгэгдлээ бичнэ үү..."
              onFocus={triggerScare}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* 8 */}
          <SelectDemo
            label="8. Удирдлагуудын зүгээс санал, санаачилгыг хэр хүлээн авч байна вэ?"
            options={{
              option1: "Идэвхтэй дэмждэг",
              option2: "Сонсдог ч хэрэгжүүлэх нь ховор",
              option3: "Сонсдоггүй",
            }}
          />

          {/* 9 */}
          <SelectDemo
            label="9. Та байгууллагад урт хугацаанд ажиллах сонирхолтой юу?"
            options={{
              option1: "Тийм, маш сонирхолтой",
              option2: "Тийм",
              option3: "Мэдэхгүй",
              option4: "Үгүй",
              option5: "Үгүй, огт сонирхолгүй",
            }}
          />

          {/* 10 */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              10. Нэмэлт санал, сэтгэгдэл (чөлөөтэй бичнэ үү)
            </label>
            <textarea
              placeholder="Санал, сэтгэгдлээ энд бичнэ үү..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              Илгээх
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
