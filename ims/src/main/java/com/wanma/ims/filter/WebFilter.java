package com.wanma.ims.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.wanma.ims.core.GlobalSystem;

public class  WebFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		request.setAttribute("webroot", req.getContextPath());
		ServletContext context=req.getSession().getServletContext();
		if(context.getAttribute("apiRoot")==null){
			String apiRoot=GlobalSystem.getConfig("apiRoot");
			context.setAttribute("apiRoot", apiRoot);
		}
		chain.doFilter(request,response);
	}

	@Override
	public void destroy() {
		
	}

}
