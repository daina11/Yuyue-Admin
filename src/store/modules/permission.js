// store/permission.js
import {asyncRouterMap, constantRouterMap} from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers =routers;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      const { roles } = data;
      if(roles.indexOf('admin') >= 0){
        return new Promise(resolve => {
        
          // console.log(roles)
          // console.log(roles.indexOf('admin'))
          var accessedRouters = asyncRouterMap.filter(v => {
            if (roles.indexOf('admin') >= 0) return true;
            if (hasPermission(roles, v)) {
              if (v.children && v.children.length > 0) {
                v.children = v.children.filter(child => {
                  if (hasPermission(roles, child)) {
                    return child
                  }
                  return false;
                });
                return v
              } else {
                return v
              }
            }
            return false;
          });
          if(accessedRouters==""){
            accessedRouters=constantRouterMap
          }
          commit('SET_ROUTERS', accessedRouters);
          resolve();
        })
      }else{
        return new Promise(resolve => {
          commit('SET_ROUTERS', constantRouterMap);
          resolve();
        })
      }
     
    }
  }
};

export default permission;

