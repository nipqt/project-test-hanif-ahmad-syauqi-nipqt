// Nama file: PostList.jsx (atau sesuaikan dengan nama komponen)
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Tetap digunakan untuk URL

const pageMark = ({ link, index }) => (
  <button
    key={index} // Gunakan index sebagai key yang unik
    onClick={() => handlePageChange(parseInt(link.label))} // Ubah string jadi angka saat diklik
    disabled={link.active} // Nonaktifkan tombol untuk halaman yang sedang aktif
    // Beri style berbeda untuk halaman yang aktif
    className={`px-2 py-1 rounded ${link.active ? 'bg-orange-500 text-white' : 'disabled:opacity-50'}`}
    >
    {link.label}
    </button>
);

// Komponen Card tidak perlu diubah
const PostCard = ({ post }) => (
  <div className="bg-white rounded-lg shadow-md/30 overflow-hidden flex flex-col gap-4">
    <img
      src={post.medium_image?.[0]?.url || 'https://placehold.co/600x400'}
      alt={post.title}
      className="w-full h-48 object-cover aspect-video"
      loading="lazy"
    />
    <div className="p-4 flex-grow">
      <h3 className="font-bold text-lg h-22 overflow-hidden" style={{
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
      }}>
        {post.title}
      </h3>
      <p className="text-gray-500 text-sm">{new Date(post.published_at).toLocaleDateString()}</p>
    </div>
  </div>
);

function PostList() { // Sebaiknya nama komponen sama dengan nama file
    // Tetap gunakan useSearchParams untuk membaca state dari URL
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '10');
    const sort = searchParams.get('sort') || '-published_at';

    // Gantikan useQuery dengan useState untuk mengelola state secara manual
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);

        // Definisikan parameter yang dibutuhkan oleh API
        const apiParams = {
            'page[number]': page,
            'page[size]': perPage,
            'append': ['small_image', 'medium_image'],
            'sort': sort,
        };

        try {
        const response = await axios.get('/api/ideas', {
          params: apiParams,
          headers: { 'Accept': 'application/json' }
        });
        setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsError(true);
        } finally {
            // Hentikan loading setelah selesai (baik berhasil maupun gagal)
            setIsLoading(false);
        }
    };
        fetchData();
    }, [page, perPage, sort]); // Dependency array: useEffect akan berjalan lagi jika nilai ini berubah

    // Handler tidak perlu diubah karena mereka hanya memanipulasi searchParams
    const handleFilterChange = (key, value) => {
        setSearchParams({ page: '1', perPage: key === 'perPage' ? value : perPage, sort: key === 'sort' ? value : sort });
    };
    
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage, perPage, sort });
    };

    const totalPages = data?.meta?.last_page || 1;

    return (
    <div className="px-60 py-4">
        <div className="flex justify-between items-center pb-8">
            <h1 className="font-semibold text-[18px]">Showing <span className="font-bold">{data?.meta?.from}</span> - <span className="font-bold">{data?.meta?.to}</span> of {data?.meta?.total}</h1>
            <div className="flex gap-8">
                <div className="flex items-center gap-2">
                    <h1>Show per Page: </h1>
                    <select value={perPage} onChange={(e) => handleFilterChange('perPage', e.target.value)} className="border border-gray-300 rounded-[16px] px-2 py-1 w-[100px]">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <h1>Sort by: </h1>
                    <select value={sort} onChange={(e) => handleFilterChange('sort', e.target.value)} className="border border-gray-300 rounded-[16px] px-2 py-1 w-[125px]">
                        <option value="-published_at">Newest</option>
                        <option value="published_at">Oldest</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Grid Postingan */}
        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Failed to load posts.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
            {data?.data.map(post => <PostCard key={post.id} post={post} />)}
        </div>
        
        {/* Paginasi */}
        <div className="flex justify-center items-center gap-2">
            <button onClick={() => handlePageChange(1)} disabled={page === 1} className="text-[24px] mb-1 font-black disabled:opacity-50">&laquo;</button>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="text-[16px] font-black disabled:opacity-50">&lt;</button>
            {data?.meta?.links.map((link, index) => {
                // Hanya render tombol jika labelnya adalah angka
                if (!isNaN(link.label)) {
                    return pageMark({ link, index });
                }
                // Tampilkan '...' jika labelnya adalah '...'
                if (link.label === '...') {
                    return <span key={index} className="px-3 py-1">...</span>
                }
                return null; // Jangan render apa pun untuk label 'Previous' dan 'Next'
            })}
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="text-[16px] font-black disabled:opacity-50">&gt;</button>
            <button onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} className="text-[24px] mb-1 font-black disabled:opacity-50">&raquo;</button>
        </div>
        {/* <pre>
        {JSON.stringify(data, null, 2)}
        </pre> */}
    </div>
    );
}

export default PostList; // Hapus kurung kurawal berlebih di sini