function quantile(s,q,k){
	s=s.sort(function(a, b){return a - b})
    N=s.length;
    p=k/q;
    j=Math.trunc((N-1)*p);
    g=(N-1)*p-j;

	return s[j]+g*(s[j+1]-s[j])
}