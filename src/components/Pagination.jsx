import React from 'react'
import { Pagination } from '@arco-design/web-react'
import { useStore } from '../store/useStore'


export default function Pager({ total }){
    const page = useStore(s => s.page)
    const setPage = useStore(s => s.setPage)
    return (
        <div style={{ display:'flex', justifyContent:'center', marginTop:16 }}>
            <Pagination total={total} pageSize={page.pageSize} current={page.pageNo} onChange={(p)=>setPage({ pageNo: p })} />
        </div>
    )
}


