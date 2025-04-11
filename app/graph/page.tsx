"use client";
import React from "react";



const GraphPage: React.FC = () => {
    
    const handleVisualizeGraph = () => {
        // Add functionality to visualize the graph
        //alert("Visualize Graph feature coming soon!");
       
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans p-6">
            {/* Header Section */}
            <header className="text-center mb-16">
                <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                    Graph Data Structures
                </h1>
                <p className="text-xl text-gray-400">
                    Visualizing Graphs, Their Properties, Applications & Traversal
                </p>
            </header>

            {/* Section: Introduction */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                    What is a Graph?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 p-8 rounded-lg border-2 border-cyan-400 hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-shadow">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            A <strong>graph</strong> is a data structure consisting of{" "}
                            <strong>nodes (vertices)</strong> and{" "}
                            <strong>edges (connections between nodes)</strong>. Graphs are
                            widely used in real life, such as in{" "}
                            <strong>social networks, maps, and recommendation systems</strong>.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src="https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2021_09_Graph-Data-Structure.jpg"
                            alt="Graph Introduction"
                            className="rounded-lg w-full md:w-3/4 h-auto"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                    </div>
                </div>
            </section>

            {/* Section: Graph Properties */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold text-purple-500 mb-8">
                    Properties of Graphs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Weighted Graph */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-yellow-400 hover:shadow-[0_0_20px_5px_rgba(250,204,21,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                            Weighted Graph
                        </h3>
                        <img
                            src="data:image/png;base64,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"
                            alt="Weighted Graph"
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                        <p className="text-gray-300">
                            A weighted graph assigns <strong>a numerical value to edges</strong>
                            , representing cost, distance, or priority.
                        </p>
                    </div>

                    {/* Directed Graph */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-cyan-400 hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                            Directed Graph
                        </h3>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAC3CAMAAADkUVG/AAAAflBMVEX///8AAAD8/Pzu7u6hoaEiIiJ+fn7i4uILCwulpaWXl5f09PSrq6uOjo7Y2Njr6+vMzMy6urrc3NzFxcXl5eXQ0NB2dnZQUFC9vb1ERETU1NRcXFxjY2NLS0upqamysrKHh4dxcXESEhIyMjI2NjYrKytpaWk9PT0eHh6KiopKhiwoAAAML0lEQVR4nO2d2ZaiMBBALRCQRdkUVETAff7/BydBbRcqkCgqgvdlzti0HYvUXsFe78ePHz9+/PjxYkxtPp9r5qeX0RgkP93DmdnQ+fR6GoCzIKKIjGQy8kZOMgzJ/7L5pxf1WdwDrAzv5qX5P4CN/6H1NIDRGmJMW6bk9fHbV9MMUjiwDMgUoP/WtTQEcwPDkh8HEL5tKY1hDDApvWAKStc89BgGcsUlHkC3pCLzbAMbVtIb1tIYDlybYAyzl6+kOexA47rOgX8vXklzcCHhvHIIXYluJYi4r90qL1xIk0ihyvFcGMGS80rTc3xnMv5Sh2VCKnD1AjgumhvxX549WOhfmCIMhcIPrdL+jFMiinCYTDxN83xLXQMo+rf5cgiELo+3pT/2IgD1NjY2XfJa+lV65Ag6FLfMfUsZgIW8LpPdo4ut66OoLCMxXu+xDFEqyZd9djJtZrCxRdf2MZjasyd6gL0eMsPaIcQlfswB+JZalQ0u/gMdAlwoBjCs5qK09kD2WMztzz+MzzARNqQuLhQHPOzlXsgS74XsS0pVOuO+z6CX4EKxcS3Y8SiHyp1QfJQUt7NL8hEtXCg91I8Mq/cJZfcVyZOKhh0y7HpsoRjF15wKe/LHhmWRPsgElFsGECIeI6ZLZwql+Pkl7kqLLJB9vg24B9spSa4LAjtF5c8pkwY6ZvVWJOHiULxGhgX9J4EUfYuiUDRMo1jsV/zXvonJjUx0YiCL1/hwGFBoLxl5i2K0wZU6nxk10ANdiWRmUx0pZmqTzYyyBWW2KL6BBvctM1ssr4mRzflJRsPV9Tbp0Z2Dh2I9pvr4cJ/DDMU8it8kt0xb5ZAZV9ukR0tMWFabwzC0RYWDDP19iVUtYBjw9+MEVCK+dNafv3hbQTTkyBLPFdf3PtXD/Imj0j25QHMIZmL+TqTpDi6lH+p/9hcN+MdcoWZhjVS5sLX6iPbYAKtddsATY5+tsm8ir3uthqO/F5zbosdIMG7QCyFJtC9eZUf55x4CJvISlX0I0/On7tThnUaTrRBgbdxu4v1tIfkgNk6gFC6HtORqtG1fo1EZ69GVP82SKsGYyxnARq+qd1kgUm13ChtLKrvvEboPo5rar5K1Jp8wTSZjW7Y1xwqIvoYlG99MYuJhljzRNzBNLcKm0A0bl+nfAJW4Wk+kQhxp7N5uDVtXYIUHhxK1I3udMx9ZCsQNblECcxhhV+boEGMvG3W4HxcgwLRgHoJSXNGEeF+lL1AlVrh7oRIyz1QS/o2gEOjl9J8XihRByPqIE+VuEEA2SMoyFHN5HrfhWyDZMFsoY1ap+nmhaFBa1BrC7BImOERtduKpeR+mnNch6jpiaR+JVRhvi2WhQjiglGsCyXtPt2+5gkH/gU7cnIiSbRcuTNEdJTM+us2+mcGxiCPJc18fBuFeVEY+bqru/joRm0kCpeiRmfHpGg7unkMqPl40k/AcWQZmiWC+XxNRbAd/4QUS/ZUxqpYJjRBBIsG7+kB33yRubUPutLQtFATuSVhLUbB8sEQm1P7eItbNlmHDd9lMfaSDnZug0xaJK3oyKTOcyZBSmjmAzJtQEN234d/mrtYlwp5zTGL+wDDamGyS1ZUJUsuantqaXXFMUJdU8oHpLyTXQjFEusz9ioHfCwb3lUfMJblX2e3v+MDqU5hEOdkBno3E+bZuHVki/jrK4yLjZrPsdM4wQhZInNYC5WAzIUlRXFR5apiM4l23U6a0jmw47N71nz9tOjM4S8R21S35Jzac6hLeQqDM5/EqppmQxHnPSIrGGcmokmuDrel7gLQ8YRBLKUlacdYWLcxlkttN08lnwvapX2oxNCEDxFVRt+lHLE2KTH1NOx+qYSVLQ53RuqVVeWvE3Me1Z3e2N87H0+kZrJXqMo1MJhTTFIbRCu/rGWQF8bLSqJnT9HgHYRANfZ7NauApDk5yGxJZ94M+4ySjlcydhRkZibc9eyK+9d53hVCfViGjyhrM1Z83+XVXEqk+FELAtBgRy256oJvUuNelBBe/rWn4am+G0eZE2H+SNhO6KQOum/4YAr3QgHdXmU5+ghF2y/ll4dG6eKE2y7d1iBm262G0vDl6DF1ypdkOeXKbJ5jxzp36YnM7nhVQq7PN+k5uCDHt8SH8ZwyJKcSkMjvXOibHjtegJ/nU60XW6yfwTM78ReZJW+6Q5jrtCwCssxRLRk56nqE6fK5n/fXQ4xcrzTUTOtFSiTR4eDxFc42dAiXTDWPAipx+vn8ml+TzYLxYaa5JOPwySTufG0kvq2NqaJ6Yd76vRy3ee+JCr3RB8uDZLlhQUvFeoF0FCdzRVf8c+CpH9eHCujTy9XFTKMIC743IWbBjzTXDbUIO7z7HNSqpodA9PHvavEV4426cW1A0JXagwLOLEERawAbJpiWNmpw6Zmgjpu+SXfSOaAYs9P4NxtuPTvgriItx3D4ZsBsSImRI7HaGbBdsJ9bct34Ml/hN9To6t2k8HdUzp1M6xLHBbKjJN9/7cia5B1yohq4bAY3UlZVIwlgGaz48Z4sJpax/+WY8S93njvAQpq7dW6GDqQ/AOklAGaHqkzTt2L10XiSJJwVmSkswMWMaGSNZ1vr43wiaN6B6ggbZfMfBq1ghycT5ECdaaRFsn7wRKpR6FAg9XzHpq2qKl4o0zobwBxgwb6QoosNogtOs7+SYo9aiQILDaIxp1iZwFEpJ4MWPJSTb5ONzmGxO1YxaPJDQMFqTn5l0LvHUoUCWQC/UaPBG+RNKLQq05Y487Ob6495FKLUokMb9UZt4NO/CpUJax3ZGh8wQgiadFilyEUotHnJXOWBEMRr+dIWTUEKBBmUpM456QB/Sev7Yqxjk/Zb6Au6SGcMzaWMOFbHI9whXY4gHiY48Qlp6SVRPVvFKcq15enj2xJIqInm3NTvq8ZkTvE0DPUAmjJ83UP18hCDATZQWlj6ypFlgtRBBvPiqS2EAqEUXTyc+m3fGl8nT+mPubstJdJ56a1wFI2Y+hfMlD2k58qT+UPt64lIGp2d4YBUF/4w0y6dZgm97UPlT+mNdWnw3qa8014MZnWFZhyo6EdZwntGfw1Xf80s8Cx/P6M/1PH+NS2oAgyf05yKVxodlYjxVRv6Tyvc8Lo6L5xoOPmJm28BBpMB6xxT67TOzFOaD86qh59JG7TOzPao/jw5GOPmgttc6M0tRHnx2l3d6ENKobWaW8qD+2H+NgHr69M1i/JD+mC3/GoPtA/ojKQKPJv9G+g9MFs1qGm5pLNgpzAoWgodGv5CZ6ANl0m8qpD2IJWgfrJrG5RqNKTZ57TR47KZGQq4nFZzQHjg09Y24Amc5TPRgUwuRBIzEtuUBygXsEbg4UXNmyF/NlHdKRW1f7YQNpFyX6V1wxn8EXIWijjjjMxOeSSSvfcXYcjj2gPzms7Kfh6PVsWraOZ2XU12qbX21AGET9yTPNVI1UIeWU9wTUfurBUX6cJy+WR375gP11vIGDTkN+U78GUDYn5wieMlL6LM7ro4LDxs+AfsCpgfYFAZq5xlAerK+eoe+QfWIHMMMnQ43/52GY3ker9Eu3JJesBxBJJEr6pq3/RZUWJRFKAkojtAhpzYQVaV447oOMH8PUbWnNbcdi9oCnvKIpHQqvtf5pn7Nup6L8A1ovOWRUeMPpdQH/3lIo9nH3GpEF/ik646UUiSRkGzege4xpS80lhUOXraQJiEWu8870dsQ/UK5bReK1juGPpgyngrpXYjgsAqJ2d8xD/o/Ni/4XXhYo0cjIlFYwyqD9tdULKylIScacUoMoWTtH8FgPsjPYAml9Cl37SBmDc8yhVL8AtXWsWblgkyheO1v/DDL80yhlH6PXztgnkfptFB+O6XIz6Yg/LwPwi9OQUAjWgrzYVIdiGjR3KdnGEYEkWFgm6UDuQ/uk0ueXdCFLBmvp2hnij/qRD3FF5wn70TlTbBGO+pEjVbsq9Z6YfvO7mP8+j4YuoBVWbc/SDmx5f6k/c70kvmfrcv/jfAt4DefgsE7ydSVY4NHomqpSF2beaNSqTioPa7nKdjfReUc7ar1tSWEpHLiuovYM9Zsflr94Or2Ml3BJrnfEaMAQO3mNjkx3QPEl/M+mkvP+ww7UEEpZ2zs85qbsj1+72jQ+i4PH9LINdIgUP8t/W5Faz9+/Pjx48ePN/Af62uGl6WHrAgAAAAASUVORK5CYII="
                            alt="Directed Graph"
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                        <p className="text-gray-300">
                            A directed graph has <strong>edges with direction</strong>, meaning
                            movement is only allowed in a specific way.
                        </p>
                    </div>

                    {/* Undirected Graph */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500 hover:shadow-[0_0_20px_5px_rgba(168,85,247,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-purple-500 mb-4">
                            Undirected Graph
                        </h3>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA8FBMVEX///9EcsXJycmysrIAAABEcsZgYGBbW1tGdcr4+Pjx8fH7+/szMzM7bcQ/b8Xl5eVIedHAwMBJSUnr6+tpaWnT09NDQ0N/f3+pttOJiYnb29uqqqqenp4+Pj7a2tpOTk6SkpKBgYEoYbskJCR0dHS2wNc2W50MFSSYmJg3NzclPWstLS0dMVWPj49be7uioqIRERGRo8nX3OY+aLQrSH1TdrnEzN3d4eklX7wUIjqXpsyAlcQzZLc6Yallgr0gSImCmMcxSHN4i7RlfKtwib4SHzQnQnKUnrMxUo2EjaQYKUc8OTGisNBCZKIGCxMJEBwRItqYAAAI6klEQVR4nO2dfV+qyhbHAQdBFFEBHyIljXbY7mGbZvbkbd/j2afTaXfe/7u5MoMJhgqMN4HP+v5jFo7jas2aNWt+gwwDAAAAAAAAAAAAAAAAAAAAAAAAAMAXoJ4MBvfjwr67kQauL3uyXJbl3oO0764knvtJmcXwcm+8784knEGP/YCfgLU2cUJsxYsisZay7w4lmOIj7xhJfLobYWuVp/vuUYI5kbGtRgidYWOxPXXfXUouDzi4i98qC2PJzX13Kbnc8CRkLY012HeXEov1H2Ii9sNY4qi7704lk0Kdm5VXPatZNffdryRyUFKZJg7w7JBFZ0M8Inu3jPId8odVco4HSTjNEs/RHOxiN86f2tU99y1pNFr44V5e5u+OY5EU3rqI3a6SvQVmsbZwnktsLX6OY6vFXGgIMRs2UG0H3UsUSv8jLBWnPX7hWr1l3tApxclOiyZSG0c76GCCqNaKnmfNR1kul8ty78a7jC6UuMjtKqjbsplsBbxWw/+8OH6+vLwcXK9cptnkMUJRsHSQMVMxQi7khVd5/MAJbaFl6GECt4SYFvrBqFnJPdT5fz8semlhIYW7smqmdlTtFDe+grloM7aFMuJeXDtKqV0q6b6nB7kjzRSsq6q6rpW8wZjHGalcHFkRXyBcff6dxOVagik0DP2zVYoaamUkbglG5JfY2rq/KNyhZdY02z80dV1ptzKQa6l9fftFn9gycAsHOVurCY1DroX9TLpAgn58GKuDCUJvx1uJhJoSJD2HTMeqhtXNWdW0T4duIhCHWqhkgzhgsWTUmQMhv2XWTDYazchYTWM3IWmdg/lIXBvqko/Ujr548eJfIG3DNgwtvh/vm3jLYi/KcZgw1CH+VPhR6Eq5lA5EYxeV4jAVwR+uPykc0833d/CmX4/V2kkzja3NcN1FlqEfGoaRQllOwaQLV0uq2yqCpeWP/b69o3f9Om6bzz//O95N9FBP/vg5ONmQqwmesFbc1X/oyxjf9GRZLMuTZ/oRcTudyDwvy5PZ7ZorcunzJQ+DRcGYlx9XK3tROVmouNhy7yTwCqlN+RZ75Xm5ccPyEzprNT0qLnYSaK2Yi6lkgJVXvCi6yqseTeC6nrgiLnGxE/sJO2z9NYlg5RXP/rp7fRGpFR83Zay1ef3zHO9bB6i4DuLunSWCsYxlHu9nCD05H5B/jN/WLR6EldPRL3QuBqu4jmn6unceZLzJLFZG6Bv5gPGjlquIECsVdEfcdDVqWXEqZUlBWiiv2MorIj/If3Ex0YnWhh+OzomXsvK9/+24CFWJpKELFgkzc294QSNXTPR3Li5/kLaeXv99J42tGKuYhmVgLbASkGsfzXPQmSuARGcV4mMUIvc3dxiKlTuEI/yKmFJIQWGU0wy0WtIr2H0yhxNp7RM6Z4csbe5wTbKs+bR6Ssa0P3fIpaLiXrc6/uKLYpmLSFtwPqD4yxFevTpDp/xA8UZE6Oa0hfOQ8o33j1KdouWvwtYUxrcJypmWZzy8eRJ4J+2mSbDHRPM2HJIM178c6KegFJNrNYyO57lROvT3euq1FuWxHO+hFbbnC+8XiU/d1QJz2NWWqaDU6n8uZC6VV+XeX//Q1UwGnrZ8a4FO8ovtBqoy7f6xa4COJgQmhc3Hnlzmy3JvOg/IF7XwipAAxkO3rRu/j36nafSL0JFQ1PGnr3L1xtrtiPHz9PfsjcxdkpWnKgxcD6a/p/cr6wAtDak70m2Eg0UObVH5e1a4qtmlK5p+GnLVNBwxKCKFMbFjKdvkwb5ygE5XGl81VqEUeFnCKHLoOGRRZOWyaoli9lo1lpmC1J3pI60Qdnb7ZFOjFDvOrBjLCBBvJY4rm9FCq9ICHLAVvKjcjt9YagpkWIojiOmErkwGXShpWqyJ0W+sFKTuKrpg8ghh3wjT22CrKmacecxnrFYq1JAWUlSSAhTQ9qixzgX1fvRigddYaRAVWTXhwvywUQhlz/rxWi1F9Q3vu6UgdS8cH+eMi9ZHgDaOtr1iU3A7jKgy9RgrFak7Y/sl+dq2FGLzTBBtYlwaq7obZc7/HfW7L1r0t+jUtkybUj7CxPhhrHSk7hjfpytuCR5bcwzFDO0lH8Yy03qIQtms6wuRkHH9kKn4wlhX0Q8fJIXcRs8Ilb3mvoeaGF1jqWk+oN/Y9ElDpvqH7RDTm2usUvJT9w1smtLCrosKje3bf8RY3VSk7uvZoMsIL29R89oWl8HGSkPqvhFl/QZ6FC2QUt98jwJsrPRkDeuorpVmRBNOcf1NE51jLK2z4YKU0FpXAI2qMssFbKotyKcndd+MsGanK7okz66vc548I6VBMBOCUvDOTQz9YtESgjP0PMOloeoeAjVYWx1L7KkKVtDEmPzd59BwgXX5mMrYg3bAplmGjMUcBc1ksWXE3OdNsywZi8kHLFkoNNdGf6VYliljBW24UAnUV9Qk2TJWwMxOp+Yv+CbGbBmL4fwLt+v72e+HJlWlThUaxF1v32YfipyMYHvqeCeupmoyozKXXrfJcTysz7qkPWCWJJZB/sGj1qNTSVbr98u2Jm/UfUwOi/s4zYimFN/Mj/bm5W8+TWmGrCWRGop7RFAkt4nk6dTKE/fsTiVArZxudGfSKpBx4yjhK/gEyTNFi1gHL569v5Mb5ZYvd9TTJHBlL05YsEN0914hJyzit3ft3vr17uXFPWGWpTlR49ybl1dez86IZ9EcoSPnD8TzM3cYZuxG6CY5Qsc/IXFhLOpTYeI5On0NPkKXdrCxKqe/+HNEDjbTnzd8+vayCIAZMxYehhXnbBIiQWsHJ1mdY7HD7A1DN8Dz7JB1PYv+jDQ7enr6F605I51uyPee8Kw4eqVPHfCxWP4UoT/J6fsspQ6YxX0rRPdrT2i23Ml9HUSRJ+FvkqXMgTDz3jGEcnHoX+5kLGJhnpeL30fa77V66y3vRZNFW7nH3splebKD75dzvqsOtzXN3hh0uX57eHjedM+rCNw25201M7JvCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAmvgfBlWfSlJg6kAAAAAASUVORK5CYII="
                            alt="Undirected Graph"
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                        <p className="text-gray-300">
                            An undirected graph has <strong>bi-directional edges</strong>,+
                            allowing movement in both directions.
                        </p>
                    </div>

                    {/* Cyclic Graph */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-yellow-400 hover:shadow-[0_0_20px_5px_rgba(250,204,21,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                            Cyclic Graph
                        </h3>
                        <img
                            src="data:image/png;base64,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"
                            alt="Cyclic Graph"
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                        <p className="text-gray-300">
                            A cyclic graph contains at least <strong>one cycle</strong>, meaning
                            a path exists where a node can be reached again.
                        </p>
                    </div>

                    {/* Loop Graph */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-cyan-400 hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                            Loop Graph
                        </h3>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40xjq7IgjYOdOvkBTIejA2R21h9BADA9iDQ&s"
                            alt="Loop Graph"
                            className="rounded-lg mb-4 w-full h-48 object-cover"
                            style={{ maxWidth: "500px", height: "300px" }}
                        />
                        <p className="text-gray-300">
                            A loop graph contains <strong>self-loops</strong>, where a node is
                            connected to itself.
                        </p>
                    </div>
                </div>

                {/* Visualize Graph Button */}
                <div className="flex justify-center mt-12">
                    <a
                        href="./graph/customgraph" // Path to the new page
                        className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-lg hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-all transform hover:scale-105"
                    >
                        Visualize Graph
                    </a>
                </div>
            </section>

            {/* Section: Graph Applications */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold text-cyan-400 mb-8">
                    Applications of Graphs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500 hover:shadow-[0_0_20px_5px_rgba(168,85,247,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-purple-500 mb-4">
                            Social Networks
                        </h3>
                        <p className="text-gray-300">
                            Representing connections between users.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-yellow-400 hover:shadow-[0_0_20px_5px_rgba(250,204,21,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                            Google Maps
                        </h3>
                        <p className="text-gray-300">
                            Finding the shortest path between locations.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-cyan-400 hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                            AI & Machine Learning
                        </h3>
                        <p className="text-gray-300">
                            Neural networks and decision graphs.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500 hover:shadow-[0_0_20px_5px_rgba(168,85,247,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-purple-500 mb-4">
                            Computer Networks
                        </h3>
                        <p className="text-gray-300">Internet routing algorithms.</p>
                    </div>
                </div>
            </section>

            {/* Section: Graph Traversal Algorithms */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold text-purple-500 mb-8">
                    Graph Traversal Algorithms
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* BFS Algorithm */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-cyan-400 hover:shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
                            Breadth-First Search (BFS)
                        </h3>
                        <p className="text-gray-300 mb-4">
                            BFS explores all nodes at the <strong>current depth level</strong>{" "}
                            before moving to the next depth.
                        </p>
                        <pre className="bg-gray-800 p-4 rounded-md text-gray-200 text-sm">
                            {`function bfs(graph, start) {
  let queue = [start];
  let visited = new Set();
  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      queue.push(...graph[node]);
    }
  }
}`}
                        </pre>
                    </div>

                    {/* DFS Algorithm */}
                    <div className="bg-gray-900 p-6 rounded-lg border-2 border-yellow-400 hover:shadow-[0_0_20px_5px_rgba(250,204,21,0.5)] transition-shadow">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                            Depth-First Search (DFS)
                        </h3>
                        <p className="text-gray-300 mb-4">
                            DFS explores as far as possible along each branch{" "}
                            <strong>before backtracking</strong>.
                        </p>
                        <pre className="bg-gray-800 p-4 rounded-md text-gray-200 text-sm">
                            {`function dfs(graph, node, visited = new Set()) {
  if (!visited.has(node)) {
    visited.add(node);
    for (let neighbor of graph[node]) {
      dfs(graph, neighbor, visited);
    }
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="mb-16">
                <h2 className="text-4xl font-bold text-cyan-400 mb-6">Conclusion</h2>
                <div className="bg-gray-900 p-8 rounded-lg border-2 border-purple-500 hover:shadow-[0_0_20px_5px_rgba(168,85,247,0.5)] transition-shadow">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Graphs are a <strong>fundamental data structure</strong> in computer
                        science, used in <strong>routing, AI, social networks,</strong> and
                        many more applications. Understanding graph properties helps in
                        solving real-world problems efficiently.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default GraphPage;