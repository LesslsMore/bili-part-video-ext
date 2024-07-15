export const constantRoute = [ //一个一个的路由规则
    {
        path: '/bili',
        name: 'bili',
        meta: {
            label: 'bili 分段视频搜索',
        },
        // component: () => import('@/components/bili/App.vue'),
        children: [
            {
                path: '/indexed',
                name: 'indexed',
                meta: {
                    label: 'indexed',
                },
                component: () => import('@/src/components/Indexed.vue')
            },
            {
                path: '/storage',
                name: 'storage',
                meta: {
                    label: 'storage',
                },
                component: () => import('@/src/components/Storage.vue')
            },
        ]
    }
]


