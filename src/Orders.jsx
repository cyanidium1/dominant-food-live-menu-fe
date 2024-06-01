import React from 'react';



function Orders({ orders }) {

    const { accepted, ready } = orders

    return (
        <div className="p-4">
            <div className='bg-black text-white text-8xl h-[70vh] flex justify-around font-semibold'>
                <div className='w-[45%] text-center'>
                    <h3 className='text-yellow-300 tracking-widest mb-4 text-6xl'>
                        Orders received
                    </h3>
                    <p className='text-2xl tracking-wider text-yellow-300'>Porositë e marra | Полученные заказы</p>

                    <div className='grid grid-cols-2 gap-3 p-2'>
                        {
                            accepted.map(el => <p className='my-2'>{el}</p>)
                        }
                    </div>

                </div>
                <div
                    class="inline-block h-full min-h-[1em] w-0.5 self-stretch bg-orange-400"></div>
                <div className='w-[45%] text-center'>
                    <h3 className='text-green-300 tracking-widest mb-4 text-6xl'>
                        Ready orders
                    </h3>
                    <p className='text-2xl tracking-wider text-green-300'>Porositë e gatshme | Готовые заказы</p>
                    <div className='grid grid-cols-2 gap-3 p-2'>
                        {
                            ready.map(el => <p className='my-2'>{el}</p>)
                        }
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Orders;