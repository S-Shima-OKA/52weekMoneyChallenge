"use client";
import { useState } from "react";

export default function HomePage() {
  const [price, setState] = useState('');
  const CALC_52WEEK = () =>{
    // const $CALC = document.getElementById('CALC'); イベントリスナはhtml側に直接組み込めるのでボタンの取得は不要。
    const $PRICE = document.getElementById('PRICE') as HTMLInputElement; //input要素として要素を取得するためにHTMLInputElementを指定する。
    const $RESULT_LIST = document.getElementById('RESULT_LIST') as HTMLElement;
    const $TOTAL_PRICE = document.getElementById('TOTAL_PRICE') as HTMLElement;
    const $ERROR_MSG = document.querySelectorAll('.error-msg');

    const RESULT = () =>{
      // リセット処理
      $TOTAL_PRICE.innerHTML = '';
      $RESULT_LIST.innerHTML= '';
      // 入力した値を52週分出力
      const $PRICE_VAL: number = $PRICE.valueAsNumber; //取得した値をnumber型で取得するためにvalueAsNumberに書き換える。
      const $PRICE_ARRAY = []; //入力された金額の週ごとの貯金額を格納する配列を作成

      if($PRICE_VAL === 0 || Number.isNaN($PRICE_VAL) || $PRICE_VAL === Math.sign(-1)){ //入力された値が0か空かマイナスの値の場合
        $ERROR_MSG.forEach(errElem =>{errElem.classList.remove('hidden')});
        return false //エラー処理が入る
      } else {
        $ERROR_MSG.forEach(errElem =>{errElem.classList.add('hidden')});

        // 現在の日付を取得して文字型に変換する
        const NOW_DATE = new Date()
        const NOW_DATE_LOCAL = NOW_DATE.toLocaleDateString();
        const NOW_DATE_STRING = new Date(NOW_DATE_LOCAL)

        // 52週（364日）後の日付を取得して文字型に変換する
        const END_DATE = new Date();
        END_DATE.setDate(END_DATE.getDate() + 364)
        const END_DATE_LOCAL = END_DATE.toLocaleDateString();
        const END_DATE_STRING = new Date(END_DATE_LOCAL)

        const DATE_ARRAY = [];

        for(let WEEK = NOW_DATE_STRING; WEEK <= END_DATE_STRING; WEEK.setDate(NOW_DATE_STRING.getDate() + 7)){
            const RESULT_DATE = WEEK.getFullYear()+'/'+(WEEK.getMonth()+1)+'/'+WEEK.getDate();
            DATE_ARRAY.push(RESULT_DATE)
        }

        for(let i = 1; i <= 52; i++){
          
          const CALC_RESULT = i * $PRICE_VAL;
          $PRICE_ARRAY.push(i * $PRICE_VAL) //入力された金額の週ごとの貯金額を配列に格納
          
          for(let j = 1; j < 2; j++){
              const TR = document.createElement('tr');
              const TD_ROW1 = document.createElement('td');                    
              const TD_ROW2 = document.createElement('td');
              const TD_ROW3 = document.createElement('td');

              TD_ROW1.classList.add(
                'w-1/3',
                'text-center',
                'p-2',
                'bg-gradient-to-r',
                'from-cyan-500',
                'to-blue-500',
                'font-bold',
                'text-white',
                'border-b',
                'border-white'
                );
              TD_ROW2.classList.add('w-1/3', 'text-center', 'p-2', 'font-bold', 'border-b', 'border-gray-400');
              TD_ROW3.classList.add('w-1/3', 'text-right', 'p-2', 'font-bold', 'border-b', 'border-gray-400', 'px-5');
              TD_ROW1.innerHTML = i + '週目';
              TD_ROW2.innerHTML = DATE_ARRAY[i-1];
              TD_ROW3.innerHTML = CALC_RESULT.toLocaleString() + '円';
              TR.appendChild(TD_ROW1);
              TR.appendChild(TD_ROW2);
              TR.appendChild(TD_ROW3);
              
              $RESULT_LIST.appendChild(TR);
          }
      }
  
      // 一週目から最終週の貯金額の合計を計算して出力
      const $WEEK_TOTAL = $PRICE_ARRAY.reduce(function(sum, elm){
          const $PRICE_NUM =  sum + elm
          // カンマ付きで金額を出力する
          $TOTAL_PRICE.innerHTML = $PRICE_NUM.toLocaleString() ;
          return sum + elm
      });
      }
    }
    RESULT()
  }
  return (
    <>
    <div className="flex flex-col h-full">
    <header 
      className="
        p-8
        px-0
        bg-gradient-to-r from-cyan-500 to-blue-500
      ">
      <h1 
        className="
          text-center
          tracking-wider
          text-white
          font-bold
          text-2xl
          sm:text-2xl
          lg:text-4xl
      ">52週貯金</h1>
    </header>
    <main 
      className="
      flex-1
        m-auto
        mt-5
        sm:mt-8
        p-2.5
        max-w-full
        sm:max-w-lg
        md:max-w-2xl
        lg:max-w-4xl
        py-12
      ">
      <p className="text-center">スタートの貯金額を入力してください。<br className="sm:hidden lg:block" />週ごとの貯金額と52週分の貯金額の合計を算出します。</p>
      <div className="
        text-center
        mt-5
        sm:mt-8
        ">
        <input
          id="PRICE"
          className="
            rounded
            border-2
            border-gray-400
            p-1
            w-52
          "
          type="number"
          value={price}
          onChange={(e) => setState(e.target.value)}
        />
        <p className="
          error-msg
          hidden
          mt-2
          text-center
          text-red-600
          ">金額を入力してください</p>
        <p>
        <button
          className="
            bg-yellow-400
            rounded
            border-2
            border-yellow-400
            p-2
            mt-3
            w-1/12
            font-bold
            w-40
          "
          type="button"
          onClick={CALC_52WEEK}
          >貯金額を計算する</button>
        </p>
          
      </div>
      <p
        className="
          text-center
          mt-5
          sm:mt-8
          md:text-xl
        ">あなたは52週で
        <span 
        id="TOTAL_PRICE"
        className="
          text-2xl
          md:text-4xl
          text-red-600
          font-bold
        "></span>円貯まります。</p>
        <h2
          className="
            text-center
            mt-5
            sm:mt-8
            md:text-xl
          ">週ごとの貯金額はこちら</h2>
      <table 
        id="RESULT_LIST"
        className="
          w-full
          md:max-w-xl
          m-auto
          mt-2
          sm:mt-4
        "></table>
    </main>
    <footer 
        className="
        p-2
        px-0
        bg-gradient-to-r from-cyan-500 to-blue-500
        text-center
      ">
      <small
        className="
          text-white
          font-bold
        "
      >&copy;Copyright S-Shima-OKA</small>
    </footer>
    </div>
    </>
  );
}

